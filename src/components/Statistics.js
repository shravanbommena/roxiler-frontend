import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://roxiler-backend-i7kg.onrender.com/api/statistics",
          {
            params: { month },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div>
      <div>Total Sale Amount: {stats.totalSaleAmount}</div>
      <div>Total Sold Items: {stats.totalSoldItems}</div>
      <div>Total Not Sold Items: {stats.totalNotSoldItems}</div>
    </div>
  );
};

export default Statistics;
