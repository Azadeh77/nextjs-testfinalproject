// File: page.js
'use client';
import Image from "next/image";
import styles from "../page.module.css";
import Navigation from '../../components/navigation';
import { Pie } from "react-chartjs-2";
import React from "react";
import { useState } from "react";
import {Chart, ArcElement} from 'chart.js'

// Register ArcElement
Chart.register(ArcElement);

export default function Home() {
  const [chartData, setChartData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/retrieveTasks')
      .then(response => response.json())
      .then(data => {
   
        const chartData = {
          labels: data.map(row => row.status),
          datasets: [{
            data: data.map(row => Number(row.count)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        };
        setChartData(chartData);
      });
  }, []);

  if (!chartData) {
    return 'Loading...';
  }

  return (
    <>
      <div className="parent-container">
        <Navigation />
        <div className="right-content">
          <Pie data={chartData} />
        </div>
      </div>
    </>
  );
}