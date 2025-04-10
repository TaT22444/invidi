// src/components/MyLineChart.jsx
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef, useState, useEffect } from 'react';

export default function MyLineChart({
  dataLabel = '訪問数',      // データセットのラベル
  labels = [],              // x 軸のラベル (日付など)
  dataPoints = [],          // グラフに表示する数値配列
  borderColor = '#468FDD',  // 線の色
  fillGradient = true,      // グラデーション塗りつぶしを使うかどうか
  period = '1w',            // 表示期間 ('1d', '1w', '1m', '3m' など)
}) {
  // チャートの参照を保持
  const chartRef = useRef(null);
  
  // 状態を管理
  const [chartData, setChartData] = useState({
    labels,
    dataPoints,
    period,
  });
  
  // 外部からのデータ更新イベントをリッスン
  useEffect(() => {
    function handleChartDataUpdate(event) {
      const newData = event.detail;
      if (newData && newData.labels && newData.displayData) {
        console.log('MyLineChart: 新しいデータを受信', newData);
        
        // 期間情報を取得（updateChartDataイベントにperiod情報を追加）
        const currentPeriod = newData.period || period;
        
        // 新しいデータを設定
        setChartData({
          labels: newData.labels,
          dataPoints: newData.displayData, 
          period: currentPeriod,
        });
      }
    }
    
    // グローバルイベントリスナーを設定
    window.addEventListener('updateChartData', handleChartDataUpdate);
    
    // コンポーネントがマウントされたことを通知
    const readyEvent = new CustomEvent('reactChartReady', {
      detail: { 
        id: dataLabel.toLowerCase().replace(/\s+/g, '-'),
        component: 'MyLineChart' 
      }
    });
    window.dispatchEvent(readyEvent);
    
    // データ属性を設定（外部からpropsを操作できるように）
    const element = document.getElementById(`${dataLabel.toLowerCase().replace(/\s+/g, '-')}-chart`);
    if (element) {
      element.setAttribute('data-component', 'MyLineChart');
      element.setAttribute('data-period', period);
    }
    
    // クリーンアップ関数
    return () => {
      window.removeEventListener('updateChartData', handleChartDataUpdate);
    };
  }, [dataLabel, period]);
  
  // 外部からのprops変更を監視し、状態を更新
  useEffect(() => {
    setChartData(prevData => ({
      ...prevData,
      period
    }));
  }, [period]);
  
  // 期間に応じたスケール設定を取得
  const getScaleOptions = () => {
    // 期間に応じて x 軸の設定を変更
    switch(chartData.period) {
      case '1d':
        return {
          x: {
            ticks: {
              color: '#808080',
              maxTicksLimit: 8,
              font: { size: 10 }
            },
            grid: { color: '#32323C' },
            border: { color: '#32323C' },
          }
        };
      case '1w':
        return {
          x: {
            ticks: {
              color: '#808080',
              maxTicksLimit: 7, // 1週間は全日表示
              font: { size: 10 }
            },
            grid: { color: '#32323C' },
            border: { color: '#32323C' },
          }
        };
      case '1m':
        return {
          x: {
            ticks: {
              color: '#808080',
              maxTicksLimit: 10, // 1ヶ月は適切に間引く
              font: { size: 10 }
            },
            grid: { color: '#32323C' },
            border: { color: '#32323C' },
          }
        };
      case '3m':
        return {
          x: {
            ticks: {
              color: '#808080',
              maxTicksLimit: 12, // 3ヶ月はさらに間引く
              font: { size: 10 }
            },
            grid: { color: '#32323C' },
            border: { color: '#32323C' },
          }
        };
      default:
        return {
          x: {
            ticks: {
              color: '#808080',
              font: { size: 10 }
            },
            grid: { color: '#32323C' },
            border: { color: '#32323C' },
          }
        };
    }
  };
  
  // Chart.js 用のデータ設定
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        borderWidth: 2,
        label: dataLabel,
        data: chartData.dataPoints,
        borderColor,
        tension: 0.3,
        pointStyle: 'circle',
        // 期間が長いときはポイントを小さくする
        pointRadius: chartData.period === '1d' || chartData.period === '1w' ? 3 : 2,
        pointHoverRadius: 5,
        // 塗りつぶし設定
        fill: {
          target: 'origin',
          // グラデーションで塗りつぶす場合
          above: fillGradient
            ? (context) => {
                const { chart } = context;
                const { ctx, chartArea } = chart;
                if (!chartArea) return null;
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, 'rgba(70, 143, 221, 0.6)');
                gradient.addColorStop(1, 'rgba(70, 143, 221, 0)');
                return gradient;
              }
            : 'rgba(70, 143, 221, 0.2)', // グラデーションを使わない場合の例
        },
      },
    ],
  };

  // x軸の設定を取得
  const scaleOptions = getScaleOptions();

  // Chart.js 用のオプション設定
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      ...scaleOptions,
      y: {
        ticks: {
          color: '#808080',
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        grid: {
          color: '#32323C22',
        },
        border: {
          color: '#32323C',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#808080',
          usePointStyle: true,
        },
        position: 'top',
        align: 'center',
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          // ツールチップの表示形式をカスタマイズ
          title: function(tooltipItems) {
            return chartData.labels[tooltipItems[0].dataIndex];
          },
          label: function(context) {
            return `${dataLabel}: ${context.parsed.y}`;
          }
        }
      }
    }
  };

  // チャートインスタンスをDOMに公開
  const onChartRef = (reference) => {
    if (reference) {
      chartRef.current = reference;
      
      try {
        const chartId = `${dataLabel.toLowerCase().replace(/\s+/g, '-')}-chart`;
        const chartElement = document.getElementById(chartId);
        if (chartElement) {
          // インスタンスをグローバルに公開
          chartElement.__chartInstance = reference;
          // データ属性を設定
          chartElement.setAttribute('data-component', 'MyLineChart');
          chartElement.setAttribute('data-period', chartData.period);
          console.log(`MyLineChart: Chart instance exposed for ${chartId} with period ${chartData.period}`);
        }
      } catch (error) {
        console.error("Failed to expose chart instance:", error);
      }
    }
  };

  // コンポーネントが更新されたときにログ出力
  useEffect(() => {
    console.log(`MyLineChart: Component updated with period ${chartData.period} and ${chartData.labels.length} data points`);
  }, [chartData]);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Line 
        data={chartConfig} 
        options={options} 
        ref={onChartRef}
        id={`${dataLabel.toLowerCase().replace(/\s+/g, '-')}-chart`}
      />
    </div>
  );
}
