// components/PieChart.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const PieChart = ({ data, labels, backgroundColors, borderColors }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new pie chart instance
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Recruitment Metrics',
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Clean up function to destroy the chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels, backgroundColors, borderColors]); // Re-run effect if these props change

  return <canvas ref={canvasRef} style={{ height: '300px' }} />;
};

export default PieChart;
