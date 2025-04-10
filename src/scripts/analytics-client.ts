// ファイル: src/scripts/analytics-client.ts
// アナリティクスページのクライアントサイドロジック

document.addEventListener('DOMContentLoaded', () => {
  // タブ切り替えの処理
  setupTabNavigation();
  
  // 期間切り替えの処理
  setupPeriodSelection();
  
  // グラフの準備ができたら初期化
  setupChartInitialization();
  
  // メトリクスのトグル処理
  setupMetricsToggle();

  // PeriodSelector.astroからのイベント処理を追加
  setupPeriodChangeListener();
});

// PeriodSelector.astroからの期間変更イベントをリッスン
function setupPeriodChangeListener() {
  document.addEventListener('periodChange', (event) => {
    if (event instanceof CustomEvent && event.detail) {
      const { period, tabId } = event.detail;
      console.log(`analytics-client: periodChange イベントを検出 - 期間: ${period}, タブ: ${tabId}`);
      
      // サンプルデータを生成（実際はAPIから取得）
      const data = generateSampleData(period);
      
      // グラフデータを更新するイベントを発火
      try {
        console.log('analytics-client: updateChartDataイベントを発火', data.chartData);
        const updateChartEvent = new CustomEvent('updateChartData', { 
          detail: {
            ...data.chartData,
            period: period, // 期間情報を明示的に追加
            source: 'periodChange', // データソースを明示
            timeUnit: period === '1d' ? 'hour' : 'day' // 時間単位も追加
          }
        });
        window.dispatchEvent(updateChartEvent);
      } catch (error) {
        console.error("Failed to dispatch updateChartData event:", error);
      }
      
      // 期間ラベルを更新
      const periodLabels = document.querySelectorAll('.section_period');
      periodLabels.forEach(label => {
        if (label instanceof HTMLElement) {
          label.textContent = data.periodLabel;
        }
      });
      
      // Reactコンポーネントのpropsを更新
      updateReactComponentProps(period);
      
      // 最新の値をメトリクス表示に反映
      updateMetricsDisplay(data);
    }
  });
}

// Reactコンポーネントのpropsを更新する関数
function updateReactComponentProps(period) {
  // MyLineChartコンポーネントが持つperiod属性を更新
  const charts = document.querySelectorAll('[data-component="MyLineChart"]');
  charts.forEach(chart => {
    if (chart instanceof HTMLElement) {
      chart.setAttribute('data-period', period);
    }
  });
}

// メトリクス表示を更新 - グラフ関連のメトリクスのみを更新し、StatsSummaryの値は更新しない
function updateMetricsDisplay(data) {
  // グラフ内部のメトリクス値のみ更新
  const graphMetricValues = document.querySelectorAll('.wrapper .graph_value');
  graphMetricValues.forEach(value => {
    if (value instanceof HTMLElement) {
      // グラフ上部の値を更新（タブに応じた最新値）
      const lastDisplayValue = data.chartData.displayData[data.chartData.displayData.length - 1];
      value.textContent = lastDisplayValue.toString();
    }
  });
  
  // 各チャートの内部メトリクス値を更新（PerformanceMetricsコンポーネント内）
  const displayValues = document.querySelectorAll('.performance-metrics .display-value');
  displayValues.forEach(value => {
    if (value instanceof HTMLElement) {
      const lastDisplayValue = data.chartData.displayData[data.chartData.displayData.length - 1];
      value.textContent = lastDisplayValue.toString();
    }
  });
  
  const clickValues = document.querySelectorAll('.performance-metrics .click-value');
  clickValues.forEach(value => {
    if (value instanceof HTMLElement) {
      const lastClickValue = data.chartData.clickData[data.chartData.clickData.length - 1];
      value.textContent = lastClickValue.toString();
    }
  });
  
  const ctrValues = document.querySelectorAll('.performance-metrics .ctr-value');
  ctrValues.forEach(value => {
    if (value instanceof HTMLElement) {
      const lastCtrValue = data.chartData.ctrData[data.chartData.ctrData.length - 1];
      value.textContent = `${lastCtrValue}%`;
    }
  });
}

// 期間に応じたサンプルデータを生成
function generateSampleData(period) {
  // 期間に応じたラベルと表示データを生成
  let labels = [];
  let displayData = [];
  let clickData = [];
  let ctrData = [];
  let periodLabel = '';
  
  switch(period) {
    case '1d':
      labels = ['00時', '03時', '06時', '09時', '12時', '15時', '18時', '21時'];
      // 1日のデータはより明確な変動を持つデータセットに変更
      displayData = [42, 28, 15, 38, 75, 98, 84, 62];
      clickData = [8, 5, 2, 9, 18, 24, 19, 14];
      periodLabel = '過去24時間';
      break;
    case '1w':
      // 曜日表示から日付表示に変更
      labels = generateDateLabels(7);
      // 1週間のデータをより論理的なパターンに
      displayData = [185, 195, 167, 210, 254, 268, 291];
      clickData = [42, 38, 35, 45, 59, 72, 76]; 
      periodLabel = '過去1週間';
      break;
    case '1m':
      // 週表示から日付表示に変更
      labels = generateDateLabels(30);
      // シード値を固定してランダム性を排除
      const seedDisplay30 = 42;
      const seedClick30 = 17;
      displayData = generateDailyData(30, 150, 350, seedDisplay30);
      clickData = generateDailyData(30, 30, 80, seedClick30);
      periodLabel = '過去1ヶ月';
      break;
    case '3m':
      // 月表示から日付表示に変更
      labels = generateDateLabels(90);
      // シード値を固定
      const seedDisplay90 = 24;
      const seedClick90 = 13;
      displayData = generateDailyData(90, 100, 450, seedDisplay90);
      clickData = generateDailyData(90, 25, 110, seedClick90);
      periodLabel = '過去3ヶ月';
      break;
    default:
      labels = generateDateLabels(7);
      displayData = [185, 195, 167, 210, 254, 268, 291];
      clickData = [42, 38, 35, 45, 59, 72, 76];
      periodLabel = '過去1週間';
  }
  
  // CTRデータを計算
  ctrData = displayData.map((display, index) => 
    display > 0 ? Math.round((clickData[index] / display) * 100) : 0
  );
  
  return {
    periodLabel,
    chartData: {
      labels,
      displayData,
      clickData,
      ctrData,
      period // 期間情報も含める
    }
  };
}

// ランダムな日別データを生成（シード値を追加）
function generateDailyData(days, min, max, seed = 1) {
  const data = [];
  let value = Math.floor((max - min) / 2) + min;
  
  // シード値を使って疑似乱数を初期化
  let randomSeed = seed;
  const pseudoRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };
  
  for (let i = 0; i < days; i++) {
    // 疑似乱数を使って変動を生成
    const change = Math.floor(pseudoRandom() * (max - min) / 10) - (max - min) / 20;
    value = Math.max(min, Math.min(max, value + change));
    data.push(Math.round(value));
    
    // 週末は少し増加傾向
    if (i % 7 === 5 || i % 7 === 6) {
      value = Math.min(max, value * 1.1);
    }
  }
  
  return data;
}

// タブナビゲーション設定
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll('.tabs_btn');
  const tabContents = document.querySelectorAll('.tab-switch');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 全てのタブボタンからactiveクラスを削除
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // クリックされたボタンにactiveクラスを追加
      button.classList.add('active');

      // 全てのタブコンテンツを非表示
      tabContents.forEach(content => {
        if (content instanceof HTMLElement) {
          content.style.display = 'none';
          content.classList.remove('active');
        }
      });
      
      // クリックされたタブに対応するコンテンツを表示
      const targetId = button.getAttribute('data-tab');
      if (targetId) {
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
          targetContent.classList.add('active');
        }
      }
    });
  });
}

// 期間選択の設定
function setupPeriodSelection() {
  const periodButtons = document.querySelectorAll('.tab_option[data-period]');
  
  periodButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブなボタンのクラスを削除
      periodButtons.forEach(btn => btn.classList.remove('active'));
      // クリックされたボタンにアクティブクラスを追加
      button.classList.add('active');
      
      // 期間に応じた処理
      const period = button.getAttribute('data-period');
      if (!period) return;
      
      // アクティブなタブを取得
      const activeTab = document.querySelector('.tabs_btn.active');
      const activeTabId = activeTab ? activeTab.getAttribute('data-tab') : 'search-performance';
      
      console.log(`analytics-client: 期間が${period}に変更されました。現在のタブ: ${activeTabId}`);
      
      // PeriodSelector.astroと同じカスタムイベントを発火
      const periodChangeEvent = new CustomEvent('periodChange', {
        detail: {
          period,
          tabId: activeTabId
        },
        bubbles: true
      });
      document.dispatchEvent(periodChangeEvent);
    });
  });
}

// グラフ初期化の設定
function setupChartInitialization() {
  window.addEventListener('chartReady', () => {
    const activeButton = document.querySelector('.tab_option.active');
    if (activeButton) {
      const period = activeButton.getAttribute('data-period') || '1w';
      
      // PeriodSelector.astroと同じカスタムイベントを発火
      const activeTab = document.querySelector('.tabs_btn.active');
      const activeTabId = activeTab ? activeTab.getAttribute('data-tab') : 'search-performance';
      
      const periodChangeEvent = new CustomEvent('periodChange', {
        detail: {
          period,
          tabId: activeTabId
        },
        bubbles: true
      });
      document.dispatchEvent(periodChangeEvent);
    }
  });
}

// メトリクスのトグル設定
function setupMetricsToggle() {
  const checkboxes = document.querySelectorAll('.metric-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      
      const metric = target.getAttribute('data-metric');
      if (!metric) return;
      
      const isChecked = target.checked;
      
      console.log(`analytics-client: チェックボックス変更 - metric=${metric}, checked=${isChecked}`);
      
      // グラフの可視性のみを切り替え、データの再生成は行わない
      const toggleEvent = new CustomEvent('toggleChartDataset', {
        detail: { 
          metric: metric, 
          visible: isChecked,
          updateData: false // データ更新しないことを明示
        }
      });
      window.dispatchEvent(toggleEvent);
    });
  });
}

// 日付ラベル生成関数（AnaliticsContent.astroスクリプト内に追加）
function generateDateLabels(days) {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 月が変わる日または週の初め、または最初と最後の日には月/日の形式で表示
    if (day === 1 || i === days - 1 || i === 0 || i % 7 === 0) {
      result.push(`${month}/${day}`);
    } else {
      // それ以外の日は日だけ表示
      result.push(`${day}`);
    }
  }
  
  return result;
} 