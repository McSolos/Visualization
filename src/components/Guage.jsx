import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

const ChartCard = ({ title, data, colors }) => {
  const chartData = {
    labels: ["Ikeja OLT", "VI OLT", "Others OLT"],
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex  flex-col items-center bg-white shadow-md rounded-lg p-4 w-48 h-64">
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <Doughnut data={chartData} options={chartOptions} />
      <div className="absolute text-lg font-bold ">
        {/* {data.reduce((a, b) => a + b, 0)} */}
      </div>
    </div>
  );
};

const Chart = () => {
  const colors = ["#3B82F6", "#FBBF24", "#06B6D4"]; // Blue, Yellow, Cyan

  return (
    <div className="flex justify-between gap-6">
      <ChartCard title="Total OLTs" data={[1, 1, 1]} colors={colors} />

      <ChartCard title="Active Ports" data={[5, 4, 3]} colors={colors} />
    </div>
  );
};

export default Chart;
