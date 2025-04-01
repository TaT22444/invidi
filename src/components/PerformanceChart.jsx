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

  // コンポーネントがマウントされたら、準備完了メッセージを送信
  useEffect(() => {
    // グローバルイベントリスナーでデータ更新を検知
    const handleUpdateChart = (e) => {
      const newData = e.detail;
      if (newData && newData.labels) {
        setChartLabels(newData.labels);
        setChartDisplayData(newData.displayData);
        setChartClickData(newData.clickData);
        setChartCtrData(newData.ctrData);
        // 時間単位も更新
        if (newData.timeUnit) {
          setChartTimeUnit(newData.timeUnit);
        }
      }
    };

    // グローバルイベントリスナーでデータセットの表示/非表示を検知
    const handleToggleDataset = (e) => {
      const { metric, visible } = e.detail;
      if (metric === 'display') {
        setShowDisplay(visible);
      } else if (metric === 'click') {
        setShowClick(visible);
      } else if (metric === 'ctr') {
        setShowCtr(visible);
      }
    };

    window.addEventListener('updateChartData', handleUpdateChart);
    window.addEventListener('toggleChartDataset', handleToggleDataset);

    // カスタムイベントで初期化完了を通知
    const readyEvent = new CustomEvent('chartReady');
    window.dispatchEvent(readyEvent);

    return () => {
      window.removeEventListener('updateChartData', handleUpdateChart);
      window.removeEventListener('toggleChartDataset', handleToggleDataset);
    };
  }, []);

  // チェックボックスの状態変更をハンドリングする関数を追加
  useEffect(() => {
    const handleCheckboxChange = (e) => {
      const metric = e.target.dataset.metric;
      const isChecked = e.target.checked;

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
    };

    // チェックボックスのイベントリスナーを設定
    const checkboxes = document.querySelectorAll('.metric-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // クリーンアップ関数
    return () => {
      checkboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', handleCheckboxChange);
      });
    };
  }, []);

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
    if (length <= 31) return 8; // 1ヶ月は8点くらい
    if (length <= 90) return 12; // 3ヶ月は12点くらい
    if (length <= 180) return 12; // 6ヶ月は12点くらい
    return 12; // 1年は12点（月ごと）
  };

  // 時間単位に基づいてX軸の表示設定を調整
  const getXAxisConfig = () => {
    // データの長さを取得
    const dataLength = chartLabels.length;
    
    // 24時間モードの場合
    if (chartTimeUnit === 'hour') {
      return {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#808080',
          maxTicksLimit: 4, // 時間表示の場合は4つ程度表示
          callback: function(value, index, values) {
            // 時間表示の場合はより詳細な表示
            return chartLabels[index];
          }
        },
        border: {
          display: false,
        },
      };
    }
    
    // 日単位以上の場合のデフォルト設定
    return {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#808080',
        maxTicksLimit: calculateMaxTicksLimit(dataLength), // データ量に応じて調整
        callback: function(value, index, values) {
          // 特定の間隔でのみラベルを表示
          return chartLabels[index];
        }
      },
      border: {
        display: false,
      },
    };
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
          display: false, // タイトルは表示しない
        },
        ticks: {
          color: '#808080',
          padding: 10,
          // 最小限の目盛りだけ表示
          maxTicksLimit: 5,
        },
        grid: {
          color: '#32323C55', // グリッド線を薄く表示
        },
        border: {
          display: false,
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
          display: false,
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
    <div style={{ width: '100%', height }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
} 