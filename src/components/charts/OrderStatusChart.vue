<template>
  <div class="h-full">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
      :style="{ height: '100%', width: '100%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  chartData: {
    labels: string[];
    datasets: any[];
  };
}

defineProps<Props>();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%",
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
        },
        color: "#374151",
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderWidth: 1,
      cornerRadius: 6,
      displayColors: true,
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed;
          const total = context.dataset.data.reduce(
            (sum: number, data: number) => sum + data,
            0
          );
          const percentage =
            total > 0 ? ((value / total) * 100).toFixed(1) : "0";
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: "#fff",
    },
  },
};
</script>
