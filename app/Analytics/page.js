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
   console.log("data",data);
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
    return (
      <>
        <div className="parent-container">
          <Navigation />
          <div className="right-content">
            Loading...
          </div>
        </div>
      </>
    );
  }

// Configure options for the pie chart
const options = {
  plugins: {
    legend: {
      display: true,
      position: 'right', // Display legend on the right side
      labels: {
        boxWidth: 20, // Adjust the width of the legend items if needed
        padding: 20, // Add padding between legend items if needed
      },
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          // Display label based on the status
          return `${context.label}: ${context.parsed}%`;
        }
      }
    }
  }
};

// Calculate total count
const totalCount = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="parent-container">
        <Navigation />
        <div className="right-content">
          <p>Current Tasks</p>
          <br></br>
          <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{width: '200px', height: '200px'}}>
          <Pie data={chartData} options={{ plugins: { legend: { display: false } } }} />
        </div>
        <table style={{ marginLeft: '20px' }}>
        <tbody>
              {chartData.labels.map((label, index) => {
                // Calculate percentage for this label
                const percentage = (chartData.datasets[0].data[index] / totalCount * 100).toFixed(2);
                return (
                  <tr key={index}>
                    <td>
                      <div style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        backgroundColor: chartData.datasets[0].backgroundColor[index]
                      }}></div>
                    </td>
                    <td>{label} : {percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
}