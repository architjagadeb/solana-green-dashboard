const chartPalette = {
  solanaGreen: "#4A7C59",
  ethereumTan: "#C8A882",
  bitcoinBrown: "#6B4226",
  axis: "#8a7968",
  grid: "rgba(232, 221, 208, 0.8)",
};

let energyChartInstance;
let co2ChartInstance;
let tpsChartInstance;

function commonChartOptions() {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        borderColor: "rgba(232, 221, 208, 1)",
        borderWidth: 1,
        titleColor: "#1C1C1C",
        bodyColor: "#1C1C1C",
      },
    },
  };
}

function initEnergyChart() {
  const ctx = document.getElementById("energyChart");
  if (!ctx) return;

  energyChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Solana", "Ethereum", "Bitcoin"],
      datasets: [
        {
          data: [0.00051, 0.03, 1147],
          backgroundColor: [chartPalette.solanaGreen, chartPalette.ethereumTan, chartPalette.bitcoinBrown],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      ...commonChartOptions(),
      scales: {
        x: {
          ticks: { color: chartPalette.axis },
          grid: { color: chartPalette.grid },
        },
        y: {
          type: "logarithmic",
          ticks: { color: chartPalette.axis },
          grid: { color: chartPalette.grid },
          title: {
            display: true,
            text: "Wh (log scale)",
            color: chartPalette.axis,
          },
        },
      },
    },
  });
}

function initCO2Chart() {
  const ctx = document.getElementById("co2Chart");
  if (!ctx) return;

  co2ChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Solana", "Ethereum", "Bitcoin"],
      datasets: [
        {
          data: [0.00024, 0.0142, 543],
          backgroundColor: [chartPalette.solanaGreen, chartPalette.ethereumTan, chartPalette.bitcoinBrown],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      ...commonChartOptions(),
      indexAxis: "y",
      scales: {
        x: {
          ticks: { color: chartPalette.axis },
          grid: { color: chartPalette.grid },
          title: {
            display: true,
            text: "g CO2 / tx",
            color: chartPalette.axis,
          },
        },
        y: {
          ticks: { color: chartPalette.axis },
          grid: { display: false },
        },
      },
    },
  });
}

function initTPSChart() {
  const ctx = document.getElementById("tpsChart");
  if (!ctx) return;

  const labels = Array.from({ length: 10 }, (_, index) => `Sample ${index + 1}`);
  tpsChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "TPS",
          data: Array(10).fill(0),
          borderColor: chartPalette.solanaGreen,
          backgroundColor: "rgba(74, 124, 89, 0.15)",
          fill: true,
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    },
    options: {
      ...commonChartOptions(),
      animation: {
        duration: 650,
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { display: false },
        },
        y: {
          grid: { color: chartPalette.grid },
          ticks: { color: chartPalette.axis, maxTicksLimit: 5 },
        },
      },
    },
  });
}

function updateTPSChart(data) {
  if (!tpsChartInstance || !Array.isArray(data)) return;
  const labels = data.map((_, index) => `Sample ${index + 1}`);
  tpsChartInstance.data.labels = labels;
  tpsChartInstance.data.datasets[0].data = data;
  tpsChartInstance.update();
}

window.initEnergyChart = initEnergyChart;
window.initCO2Chart = initCO2Chart;
window.initTPSChart = initTPSChart;
window.updateTPSChart = updateTPSChart;
