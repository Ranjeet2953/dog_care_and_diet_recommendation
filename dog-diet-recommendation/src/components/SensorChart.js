// src/components/SensorChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorChart = ({ sensorDataHistory }) => {
  // Prepare data for the chart
  const data = {
    labels: sensorDataHistory.map((dataPoint, index) => `Point ${index + 1}`), // Labels based on index of the data points
    datasets: [
      {
        label: "Temperature (°C)",
        data: sensorDataHistory.map((dataPoint) => dataPoint.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: sensorDataHistory.map((dataPoint) => dataPoint.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Heart Rate (BPM)",
        data: sensorDataHistory.map((dataPoint) => dataPoint.heartRate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sensor Data Over Time",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SensorChart;
