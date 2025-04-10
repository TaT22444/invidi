import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef, useState, useEffect } from 'react';

export default function PerformanceChart({
  labels = [],                // x軸のラベル（日付など）
  displayData = [],           // 表示回数データ
  clickData = [],             // クリック数データ
  ctrData = [],               // CTRデータ
  displayColor = '#468FDD',   // 表示回数の線の色
  clickColor = '#4CAF50',     // クリック数の線の色
  ctrColor = '#FFA726',       // CTRの線の色
  height = '300px',           // チャートの高さ
  maxY = 500,                 // 表示回数のスケール
  maxY2 = 50,                 // クリック数のスケール
  maxY1 = 100,                // CTRのスケール
  showSeparateYAxis = true,   // 別のY軸を表示するかどうか
  showDisplay: initialShowDisplay = true,
  showClick: initialShowClick = true,
  showCtr: initialShowCtr = true,
  timeUnit = 'day',           // 時間単位（'hour'または'day'）
  period = '1w',              // 表示期間 - 追加
}) {
  const chartRef = useRef(null);
  const [showDisplay, setShowDisplay] = useState(initialShowDisplay);
  const [showClick, setShowClick] = useState(initialShowClick);
  const [showCtr, setShowCtr] = useState(initialShowCtr);
  
  // チャートデータの状態を追加
  const [chartLabels, setChartLabels] = useState(labels);
  const [chartDisplayData, setChartDisplayData] = useState(displayData);
  const [chartClickData, setChartClickData] = useState(clickData);
  const [chartCtrData, setChartCtrData] = useState(ctrData);
  const [chartTimeUnit, setChartTimeUnit] = useState(timeUnit);
  const [currentPeriod, setCurrentPeriod] = useState(period);

  // データの状態と処理を明確に分離
  useEffect(() => {
    // コンポーネントがマウントされたら、準備完了メッセージを送信
    if (chartRef.current) {
      try {
        // チャートインスタンスを外部からアクセスできるように設定
        const chartCanvas = chartRef.current.canvas;
        if (chartCanvas) {
          chartCanvas.__chartInstance = chartRef.current;
          chartCanvas.setAttribute('data-period', currentPeriod);
          chartCanvas.setAttribute('data-component', 'PerformanceChart');
          chartCanvas.id = 'performance-chart';
          console.log('PerformanceChart: チャートインスタンスを公開しました');
        }
      } catch (error) {
        console.error('PerformanceChart: チャートインスタンスの公開に失敗:', error);
      }
    }
    
    // グローバルイベントリスナーでデータ更新を検知
    const handleUpdateChart = (e) => {
      const newData = e.detail;
      if (newData && newData.labels) {
        console.log('PerformanceChart: updateChartDataイベント受信', newData);
        
        // 状態を更新
        setChartLabels(newData.labels);
        setChartDisplayData(newData.displayData);
        setChartClickData(newData.clickData);
        setChartCtrData(newData.ctrData);
        
        // 期間情報があれば更新
        if (newData.period) {
          setCurrentPeriod(newData.period);
          
          // チャートキャンバスの属性も更新
          if (chartRef.current && chartRef.current.canvas) {
            chartRef.current.canvas.setAttribute('data-period', newData.period);
          }
        }
        
        // 時間単位も更新
        if (newData.timeUnit) {
          setChartTimeUnit(newData.timeUnit);
        }
        
        // 指標の合計値を計算して指標更新イベントを発火
        const totalDisplay = newData.displayData.reduce((sum, val) => sum + val, 0);
        const totalClick = newData.clickData.reduce((sum, val) => sum + val, 0);
        const averageCtr = totalDisplay > 0 ? (totalClick / totalDisplay * 100).toFixed(1) : "0";
        
        // 指標更新イベントを発火
        window.dispatchEvent(new CustomEvent('metricsDataUpdated', {
          detail: {
            totalDisplay,
            totalClick,
            averageCtr
          }
        }));
      }
    };

    // グローバルイベントリスナーでデータセットの表示/非表示を検知
    const handleToggleDataset = (e) => {
      if (!e.detail) return;
      
      const { metric, visible, updateData } = e.detail;
      
      // updateDataフラグがtrueの場合のみデータを更新する（デフォルトはfalse）
      if (updateData === true) {
        // ここでは何もしない（データ更新は別のリスナーで行う）
        return;
      }
      
      console.log(`PerformanceChart: toggleChartDataset イベント受信 - metric=${metric}, visible=${visible}`);
      
      // データセットの可視性のみを更新
      switch (metric) {
        case 'display':
          setShowDisplay(visible);
          break;
        case 'click':
          setShowClick(visible);
          break;
        case 'ctr':
          setShowCtr(visible);
          break;
      }
    };

    window.addEventListener('updateChartData', handleUpdateChart);
    window.addEventListener('toggleChartDataset', handleToggleDataset);

    // カスタムイベントで初期化完了を通知
    setTimeout(() => {
      const readyEvent = new CustomEvent('chartReady');
      window.dispatchEvent(readyEvent);
      console.log('PerformanceChart: chartReadyイベント発火');
    }, 100); // 少し遅延させて確実に発火

    return () => {
      window.removeEventListener('updateChartData', handleUpdateChart);
      window.removeEventListener('toggleChartDataset', handleToggleDataset);
    };
  }, [chartRef]);

  // チェックボックスの状態変更をハンドリングする関数を追加
  useEffect(() => {
    const handleCheckboxChange = (e) => {
      const checkbox = e.target;
      const metric = checkbox.getAttribute('data-metric');
      const isChecked = checkbox.checked;
      
      console.log(`PerformanceChart: チェックボックス変更 - metric=${metric}, checked=${isChecked}`);
      
      // データセットの可視性のみを更新し、データは変更しない
      switch (metric) {
        case 'display':
          setShowDisplay(isChecked);
          break;
        case 'click':
          setShowClick(isChecked);
          break;
        case 'ctr':
          setShowCtr(isChecked);
          break;
      }
      
      // ダブルイベント発火を防止するために、ここではトグルイベントを発火しない
    };

    // チェックボックスのイベントリスナーを設定
    const checkboxes = document.querySelectorAll('.metric-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', handleCheckboxChange);
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // トグルチャートデータセットイベントのリスナー
    const handleToggleDataset = (e) => {
      if (!e.detail) return;
      
      const { metric, visible } = e.detail;
      console.log(`PerformanceChart: toggleChartDataset イベント受信 - metric=${metric}, visible=${visible}`);
      
      // データセットの可視性のみを更新
      switch (metric) {
        case 'display':
          setShowDisplay(visible);
          break;
        case 'click':
          setShowClick(visible);
          break;
        case 'ctr':
          setShowCtr(visible);
          break;
      }
    };
    
    window.addEventListener('toggleChartDataset', handleToggleDataset);

    // クリーンアップ関数
    return () => {
      checkboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', handleCheckboxChange);
      });
      window.removeEventListener('toggleChartDataset', handleToggleDataset);
    };
  }, []);

  // useEffectの依存配列を修正（chartData関連）
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      // チャートを更新
      chartRef.current.chart.update();
    }
  }, [chartDisplayData, chartClickData, chartCtrData, showDisplay, showClick, showCtr]);

  // データセットの可視性を制御
  const datasets = [
    {
      label: '表示回数',
      data: chartDisplayData,
      borderColor: displayColor,
      backgroundColor: `${displayColor}1A`,
      borderWidth: 1.6,
      tension: 0.1,
      yAxisID: 'y',
      hidden: !showDisplay,
      pointRadius: 2, // ポイントのサイズを2pxに縮小（デフォルトは3px）
      pointHoverRadius: 4 // ホバー時のサイズを4pxに縮小（デフォルトは6px）
    },
    {
      label: 'クリック数',
      data: chartClickData,
      borderColor: clickColor,
      backgroundColor: `${clickColor}1A`,
      borderWidth: 1.6,
      tension: 0.1,
      yAxisID: showSeparateYAxis ? 'y2' : 'y',
      hidden: !showClick,
      pointRadius: 2, // ポイントのサイズを2pxに縮小
      pointHoverRadius: 4 // ホバー時のサイズを4pxに縮小
    },
    {
      label: 'CTR (%)',
      data: chartCtrData,
      borderColor: ctrColor,
      backgroundColor: `${ctrColor}1A`,
      borderWidth: 1.6,
      tension: 0.1,
      yAxisID: 'y1',
      hidden: !showCtr,
      pointRadius: 2, // ポイントのサイズを2pxに縮小
      pointHoverRadius: 4 // ホバー時のサイズを4pxに縮小
    }
  ];

  const chartData = {
    labels: chartLabels,
    datasets
  };

  // データの長さに基づいてX軸の目盛り数を計算
  const calculateMaxTicksLimit = (length) => {
    if (length <= 7) return 7; // 1週間以内は全て表示
    if (length <= 31) return 10; // 1ヶ月は10点くらい
    if (length <= 90) return 12; // 3ヶ月は12点くらい
    return 12; // その他
  };

  // 時間単位と期間に基づいてX軸の表示設定を調整
  const getXAxisConfig = () => {
    // データの長さを取得
    const dataLength = chartLabels.length;
    
    // 期間によって表示を調整
    switch (currentPeriod) {
      case '1d':
        return {
          display: true,
          grid: {
            display: true,
            color: '#32323C22',  // MyLineChartと同じ薄い色に
          },
          ticks: {
            color: '#808080',
            maxTicksLimit: 8, // 24時間表示の場合は8つ程度表示
            font: {
              size: 10
            }
          },
          border: {
            display: true,
            color: '#32323C',    // MyLineChartと同じボーダー色に
          },
        };
      case '1w':
        return {
          display: true,
          grid: {
            display: true,
            color: '#32323C22',  // MyLineChartと同じ薄い色に
          },
          ticks: {
            color: '#808080',
            maxTicksLimit: 7, // 1週間は全日表示
            font: {
              size: 10
            }
          },
          border: {
            display: true,
            color: '#32323C',    // MyLineChartと同じボーダー色に
          },
        };
      case '1m':
        return {
          display: true,
          grid: {
            display: true,
            color: '#32323C22',  // MyLineChartと同じ薄い色に
          },
          ticks: {
            color: '#808080',
            autoSkip: true,
            autoSkipPadding: 15,
            maxTicksLimit: 10, // 1ヶ月は約10点表示
            font: {
              size: 10
            }
          },
          border: {
            display: true,
            color: '#32323C',    // MyLineChartと同じボーダー色に
          },
        };
      case '3m':
        return {
          display: true,
          grid: {
            display: true,
            color: '#32323C22',  // MyLineChartと同じ薄い色に
          },
          ticks: {
            color: '#808080',
            autoSkip: true,
            autoSkipPadding: 20,
            maxTicksLimit: 12, // 3ヶ月は12点程度
            font: {
              size: 10
            }
          },
          border: {
            display: true,
            color: '#32323C',    // MyLineChartと同じボーダー色に
          },
        };
      default:
        // デフォルト設定
        return {
          display: true,
          grid: {
            display: true,
            color: '#32323C22',  // MyLineChartと同じ薄い色に
          },
          ticks: {
            color: '#808080',
            maxTicksLimit: calculateMaxTicksLimit(dataLength), // データ量に応じて調整
            font: {
              size: 10
            },
            autoSkip: true,
            autoSkipPadding: 15
          },
          border: {
            display: true,
            color: '#32323C',    // MyLineChartと同じボーダー色に
          },
        };
    }
  };

  // Chart.js用のオプション設定
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // X軸（日付）の設定
      x: getXAxisConfig(),
      // メインのY軸（表示回数）
      y: {
        beginAtZero: true,
        suggestedMax: maxY,
        position: 'left',
        title: {
          display: false,
        },
        ticks: {
          display: false, // 左側の目盛りラベルは非表示のまま
          color: '#808080',
          padding: 10,
          // 最小限の目盛りだけ表示
          maxTicksLimit: 5,
        },
        grid: {
          color: '#32323C22', // MyLineChartと同じ薄い色に
          drawBorder: false,
        },
        border: {
          display: true,
          color: '#32323C', // MyLineChartと同じボーダー色に
        },
      },
      // クリック数のY軸（別軸の場合）
      y2: {
        beginAtZero: true,
        suggestedMax: maxY2,
        position: 'left',
        display: showSeparateYAxis, // 必要な場合のみ表示
        title: {
          display: false,
        },
        ticks: {
          display: false, // 目盛りは表示しない
          color: '#808080',
        },
        grid: {
          drawOnChartArea: false, // グリッド線は表示しない
        },
        border: {
          display: false,
        },
      },
      // CTR用のY1軸
      y1: {
        beginAtZero: true,
        suggestedMax: maxY1,
        position: 'right',
        title: {
          display: false,
        },
        ticks: {
          display: true, // CTRの目盛りラベルを表示する
          color: '#808080',
          padding: 10,
          // 最小限の目盛りだけ表示
          maxTicksLimit: 5,
          // パーセント表示
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          drawOnChartArea: false, // グリッド線は表示しない
        },
        border: {
          display: true,
          color: '#32323C', // MyLineChartと同じボーダー色に
        },
      }
    },
    plugins: {
      legend: {
        display: false, // 凡例は非表示（パフォーマンス指標の方で表示するため）
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        // ツールチップの表示形式をカスタマイズ
        callbacks: {
          title: function(tooltipItems) {
            const item = tooltipItems[0];
            return chartLabels[item.dataIndex];
          },
          label: function(context) {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            if (label === 'CTR (%)') {
              return `${label}: ${value}%`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height, padding: '0 8px' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
} 