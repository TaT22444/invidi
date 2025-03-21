import { jsx } from 'react/jsx-runtime';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function MyLineChart({
  dataLabel = "訪問数",
  // データセットのラベル
  labels = [],
  // x 軸のラベル (日付など)
  dataPoints = [],
  // グラフに表示する数値配列
  borderColor = "#468FDD",
  // 線の色
  fillGradient = true
  // グラデーション塗りつぶしを使うかどうか
}) {
  const chartData = {
    labels,
    datasets: [
      {
        borderWidth: 2,
        // ★ ここで線の太さを指定
        label: dataLabel,
        data: dataPoints,
        borderColor,
        tension: 0.3,
        pointStyle: "circle",
        // 塗りつぶし設定
        fill: {
          target: "origin",
          // グラデーションで塗りつぶす場合
          above: fillGradient ? (context) => {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(70, 143, 221, 0.6)");
            gradient.addColorStop(1, "rgba(70, 143, 221, 0)");
            return gradient;
          } : "rgba(70, 143, 221, 0.2)"
          // グラデーションを使わない場合の例
        }
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#808080"
        },
        grid: {
          color: "#32323C"
        },
        border: {
          color: "#32323C"
        }
      },
      y: {
        ticks: {
          color: "#808080",
          beginAtZero: true
        },
        grid: {
          color: "#32323C"
        },
        border: {
          color: "#32323C"
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#808080",
          usePointStyle: true
          // ★ 凡例に pointStyle を使用
        },
        position: "top",
        // ★ 凡例を上に表示
        align: "center"
        // ★ 左寄せ
      },
      title: {
        display: false,
        color: "#808080",
        font: {
          size: 14
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff"
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "200px" }, children: /* @__PURE__ */ jsx(Line, { data: chartData, options }) });
}

export { MyLineChart as M };
