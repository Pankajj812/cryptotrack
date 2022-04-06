import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function HistoryChart({ chartData }) {
  const { labels, priceCorrespondentToLabels, filter } = chartData;
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historical Data",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Price Past ${
          filter?.frequency
        } days in ${filter?.currency?.toUpperCase()}`,
        data: priceCorrespondentToLabels,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
