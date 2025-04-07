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
});

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
      tabContents.forEach(content => content.classList.remove('active'));
      // クリックされたタブに対応するコンテンツを表示
      const targetId = button.getAttribute('data-tab');
      if (targetId) {
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      }
    });
  });
}

// 期間選択の設定
function setupPeriodSelection() {
  const periodButtons = document.querySelectorAll('.tab_option[data-period]');
  const periodLabels = document.querySelectorAll('.section_period');
  
  periodButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブなボタンのクラスを削除
      periodButtons.forEach(btn => btn.classList.remove('active'));
      // クリックされたボタンにアクティブクラスを追加
      button.classList.add('active');
      
      // 期間に応じた表示テキストを設定
      const period = button.getAttribute('data-period');
      let periodText = '過去1週間';
      
      if (period) {
        switch(period) {
          case '24h':
            periodText = '過去24時間';
            break;
          case '1w':
            periodText = '過去1週間';
            break;
          case '1m':
            periodText = '過去1ヶ月';
            break;
          case '3m':
            periodText = '過去3ヶ月';
            break;
          case '6m':
            periodText = '過去6ヶ月';
            break;
          case '1y':
            periodText = '過去12ヶ月';
            break;
        }
      }
      
      // 期間表示を更新
      periodLabels.forEach(label => {
        label.textContent = periodText;
      });
      
      // グラフデータを更新するイベントを発行
      const updateEvent = new CustomEvent('updatePeriod', { 
        detail: { period }
      });
      window.dispatchEvent(updateEvent);
      
      console.log(`期間を${periodText}に変更しました`);
    });
  });
}

// グラフ初期化の設定
function setupChartInitialization() {
  window.addEventListener('chartReady', () => {
    const activeButton = document.querySelector('.tab_option.active');
    if (activeButton) {
      const period = activeButton.getAttribute('data-period') || '1w';
      
      // 期間更新イベントを発行
      const updateEvent = new CustomEvent('updatePeriod', { 
        detail: { period }
      });
      window.dispatchEvent(updateEvent);
    }
  });
}

// メトリクスのトグル設定
function setupMetricsToggle() {
  const checkboxes = document.querySelectorAll('.metric-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const metric = target.getAttribute('data-metric');
      const isChecked = target.checked;
      
      // 対応する値の表示/非表示を切り替え
      const metricValue = target.closest('.metric')?.querySelector(`.${metric}-value`);
      if (metricValue instanceof HTMLElement) {
        metricValue.style.opacity = isChecked ? '1' : '0.3';
      }
      
      // グラフのデータセット表示/非表示を切り替え
      const toggleEvent = new CustomEvent('toggleChartDataset', {
        detail: { metric, visible: isChecked }
      });
      window.dispatchEvent(toggleEvent);
    });
  });
} 