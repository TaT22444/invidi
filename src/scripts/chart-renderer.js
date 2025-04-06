// src/scripts/chart-renderer.js
// 汎用チャートレンダリングヘルパー

export function renderChart(canvasId, labels, data, title, borderColor = '#468FDD') {
  // キャンバス要素を取得
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with ID ${canvasId} not found`);
    return Promise.reject(new Error(`Canvas not found: ${canvasId}`));
  }

  // データのチェック
  if (!Array.isArray(labels) || !Array.isArray(data)) {
    console.error(`Invalid data format for chart ${canvasId}:`, { labels, data });
    labels = ["No data"];
    data = [0];
  }

  // Chart.jsを動的にロード
  return import('chart.js/auto')
    .then(module => {
      const Chart = module.default;
      
      // チャートを作成
      return new Chart(canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            borderColor: borderColor,
            borderWidth: 2,
            tension: 0.3,
            pointBackgroundColor: borderColor,
            fill: true,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 200); // 高さを調整
              gradient.addColorStop(0, `${borderColor}40`);
              gradient.addColorStop(1, `${borderColor}00`);
              return gradient;
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: 'rgba(200, 200, 200, 0.1)',
                display: false, // グリッド線を非表示に
              },
              ticks: { 
                color: '#808080',
                font: {
                  size: 10 // フォントサイズを小さく
                },
                maxRotation: 0, // ラベルの回転を防止
                autoSkip: true, // 必要に応じてラベルをスキップ
                maxTicksLimit: 7 // 表示するティックの最大数
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(200, 200, 200, 0.1)',
              },
              ticks: { 
                color: '#808080',
                font: {
                  size: 10 // フォントサイズを小さく
                },
                padding: 5 // パディングを小さく
              }
            }
          },
          plugins: {
            legend: {
              display: false, // 凡例を非表示に（スペース節約のため）
              labels: {
                color: '#808080',
                usePointStyle: true,
                font: {
                  size: 10 // フォントサイズを小さく
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleColor: '#fff',
              bodyColor: '#fff',
              cornerRadius: 4,
              padding: 6, // パディングを小さく
              titleFont: {
                size: 12 // タイトルフォントを小さく
              },
              bodyFont: {
                size: 11 // 本文フォントを小さく
              }
            }
          },
          // 余白を減らす
          layout: {
            padding: {
              top: 5,
              right: 10,
              bottom: 5,
              left: 5
            }
          },
          // ポイントを小さくする
          elements: {
            point: {
              radius: 3, // ポイントのサイズを小さく
              hoverRadius: 5 // ホバー時のサイズも小さく
            },
            line: {
              borderWidth: 2 // 線の太さ
            }
          }
        }
      });
    });
} 