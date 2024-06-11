import React, { useState, useEffect } from "react";
import axios from "axios";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    const response = await axios.get(
      `https://roxiler-backend-i7kg.onrender.com/api/bar-chart`,
      {
        params: { month },
      }
    );
    setData(response.data);
  };

  const chartData = {
    labels: data.map((d) => d.range),
    datasets: [
      {
        label: "Number of Items",
        data: data.map((d) => d.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
        text: "Number of Items by Price Range",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
