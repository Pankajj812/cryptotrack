import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Coins Current Price",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
};

export default function CoinChart(props) {
  const { label, data } = props;

  const dataOption = {
    labels: label,
    datasets: [
      {
        label: "Current Price",
        data: data,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "50%",
          height: "10%",
        },
      }}
    >
      <Paper>
        {props.children}
        <Bar options={options} data={dataOption} />
      </Paper>
    </Box>
  );
}
