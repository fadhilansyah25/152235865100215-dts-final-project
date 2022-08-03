import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Box, Skeleton } from "@mui/material";
import dayjs from "dayjs";

Chart.register(...registerables);

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.push(coinHistory?.history[i].price);
    coinTimestamp.push(
      dayjs.unix(coinHistory?.history[i].timestamp).format("HH:mm")
    );
  }

  return coinHistory ? (
    <Box sx={{ my: 4 }}>
      <Line
        height={400}
        data={{
          labels: coinTimestamp,
          datasets: [
            {
              label: "Price In USD",
              data: coinPrice,
              backgroundColor: "rgba(255,255,255, 0.1)",
              borderColor: "#0071bd",
              fill: true,
              lineTension: 0.1,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: true,
                border: 0,
                color: "rgba(255,255,255, 0.1)",
              },
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 1,
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </Box>
  ) : (
    <Skeleton height={400} />
  );
}
