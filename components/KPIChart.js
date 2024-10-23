import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function KPIChart({ kpis = [] }) {
  // Ensure kpis is an array, or provide default empty data
  const data = {
    labels: kpis.length ? kpis.map(kpi => kpi.period) : ['No Data'], // Fallback if no data
    datasets: [
      {
        label: 'Time to Fill',
        data: kpis.length ? kpis.map(kpi => kpi.timeToFill) : [0], // Fallback if no data
        borderColor: 'rgba(57, 255, 20, 1)',
        backgroundColor: 'rgba(57, 255, 20, 0.2)',
        tension: 0.2, // For a more modern curved line
      },
      // You can add more datasets for other KPIs if needed
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'KPI Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">KPI Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
}
