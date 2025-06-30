import React from "react";
import { Bar } from "react-chartjs-2";
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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RevenueChart() {
  // Sample data for revenue over 5 years
  const data = {
    labels: ["2021", "2022", "2023", "2024", "2025"], // Years
    datasets: [
      {
        label: "Revenue (in Rwf)",
        data: [4000000, 6000000, 7500000, 8000000, 9000000], // Revenue values in Rwf
        backgroundColor: "#4caf50", // Bar color
        borderColor: "#388e3c", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Earned Over 5 Years (Rwf)",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0
        title: {
          display: true,
          text: "Revenue (Rwf)", // Updated to Rwf
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default RevenueChart;