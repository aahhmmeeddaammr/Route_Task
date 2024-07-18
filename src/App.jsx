import React, { useState } from 'react';
import CustomerTable from './Components/Home/Home';
import TransactionChart from './Components/TransactionChart/TransactionChart';
import { getTransactions } from './api';
import { useSelector } from 'react-redux';
import DataAnalysis from './Components/Analysis/DataAnalysis';

const App = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  let [close, setclose] = useState(false)
  let currentuser=useSelector((state)=>(state.CurrentCostumer.CurrentCostumerr))
  const handleCustomerSelect = () => {
    setclose(false)
    setSelectedCustomerId(currentuser);
    getTransactions().then((response) =>
      setTransactions(response.data.filter((t) => t.customer_id == currentuser))
    );
  };

  return (
    <div className="container">
      <div className='row '>
        <h1 className='text-center'>Customer Transactions</h1>
        <hr className='mb-4 ' />
          <DataAnalysis/>
        <hr className='mb-4 ' />
        <div id='Home' className={`col-md-${selectedCustomerId ? close ? '12' : '6' : '12'} `}>
          <CustomerTable onCustomerSelect={handleCustomerSelect} />
        </div>
        <div  className={`${close?'d-none':'col-md-6'} align-items-center`}>
          <div >
            <div id='graph' className={` opacity-${selectedCustomerId?close?'0' :'100' :'0'}  position-relative`}>
              <i style={{ cursor:'pointer' }} onClick={() => {
                setSelectedCustomerId(null)
                setclose(true)
              }} id='close' className='position-absolute end-0' >X</i>
              <TransactionChart transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
