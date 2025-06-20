<template>
  <div class="h-full">
    <Bar
      :data="chartData"
      :options="chartOptions"
      :style="{ height: '100%', width: '100%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#A8B5C8",
      borderWidth: 1,
      cornerRadius: 6,
      displayColors: false,
      callbacks: {
        label: function (context: any) {
          const value = context.parsed.y;
          return `Orders: ${value} ${value === 1 ? "order" : "orders"}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
        color: "#6B7280",
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 12,
        },
        color: "#6B7280",
        stepSize: 1,
        callback: function (value: any) {
          return Number.isInteger(value) ? value : null;
        },
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 4,
      borderSkipped: false,
    },
  },
};
</script>
