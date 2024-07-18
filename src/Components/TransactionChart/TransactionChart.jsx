import React, { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const uniqueDates = [...new Set(transactions.map(transaction => transaction.date))];
  const amountsPerDay = uniqueDates.map(date => {
    return transactions
      .filter(transaction => transaction.date === date)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  });

  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: 'Transaction Amount',
        data: amountsPerDay,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Transaction Amount Per Day',
      },
    },
  };

  return <Bar data={data} options={options} />

};


export default TransactionChart;
