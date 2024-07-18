import React from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useCustomers } from '../../Hooks/useCustomers';
import { useTransactions } from '../../Hooks/useTransactions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const DataAnalysis = () => {
    const { customers, loading: customersLoading } = useCustomers();
    const { transactions , loading: transactionsLoading } = useTransactions();

    const data = {
        customers: [
            ...customers
        ],
        transactions: [
            ...transactions
        ]
    };

    // Analysis functions
    const totalTransactionsPerCustomer = data.customers.map(customer => {
        const transactions = data.transactions.filter(transaction => transaction?.customer_id == customer?.id);
        const totalAmount = transactions.reduce((sum, transaction) => sum + transaction?.amount, 0);
        return {
            customerName: customer.name,
            totalAmount
        };
    });

    const highestTransaction = data.transactions.reduce((max, transaction) => transaction.amount > max.amount ? transaction : max, data.transactions[0]);
    const transactionsOverTime = data.transactions.reduce((acc, transaction) => {
        if (!acc[transaction.date]) {
            acc[transaction.date] = 0;
        }
        acc[transaction.date] += transaction.amount;
        return acc;
    }, {});

    // Data for charts
    const barData = {
        labels: totalTransactionsPerCustomer.map(entry => entry.customerName),
        datasets: [
            {
                label: 'Total Transactions per Customer',
                data: totalTransactionsPerCustomer.map(entry => entry.totalAmount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const lineData = {
        labels: Object.keys(transactionsOverTime),
        datasets: [
            {
                label: 'Transactions Over Time',
                data: Object.values(transactionsOverTime),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)'
            }
        ]
    };
    if (customersLoading || transactionsLoading) return <h1>Loading...</h1>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Data Analysis</h1>
            <div className="row g-1 ">
                <div className="col-md-4 align-items-center ">
                    <h5>Total Transactions per Customer</h5>
                    <div className="mb-4">
                        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } } }} />
                    </div>
                </div>
                <div className="col-md-4  align-items-center">
                    <h5>Highest Transaction</h5>
                    <div className="card mb-4 py-3">
                        <div className="card-body">
                            <h3 className="card-title">Highest Transaction</h3>
                            <p className="card-text">
                                <strong>Customer ID:</strong> {highestTransaction.customer_id}<br />
                                <strong>Date:</strong> {highestTransaction.date}<br />
                                <strong>Amount:</strong> ${highestTransaction.amount}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h5>Transactions Over Time</h5>
                    <div className="mb-4">
                        <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } } }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DataAnalysis;