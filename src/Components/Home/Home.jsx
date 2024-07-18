import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {SetCurrentCustomer } from '../../Redux/CustumerSlice';
import SearchByName from '../SearchByName/SearchByName';
import SearchByAmount from '../SearchByAmount/SearchByAmont';
import { useCustomers } from '../../Hooks/useCustomers';
import { useTransactions } from '../../Hooks/useTransactions';

const CustomerTable = ({ onCustomerSelect }) => {

  const { customers, loading: customersLoading } = useCustomers();
  const { transactions, filteredTransactions, setFilteredTransactions, loading: transactionsLoading } = useTransactions();
  const dispatch = useDispatch();

  const handleSearchByName = (value) => {
    setFilteredTransactions(
      transactions.filter((transaction) =>
        customers.some((customer) => customer.id == transaction.customer_id && customer.name.includes(value))
      )
    );
  };

  const handleSearchByAmount = (value) => {
    if(value == -1){

      setFilteredTransactions(transactions)
    } else{

      setFilteredTransactions(transactions.filter((transaction) => transaction.amount == Number(value)));
    }
  };

  useEffect(()=>{
    AOS.init();
  },[])

  if (customersLoading || transactionsLoading) return <h1>Loading...</h1>;

  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-12 col-xl-6 col-lg-7 col-md-12" >
          <SearchByName onSearch={handleSearchByName} />
        </div>
        <div className="col-sm-12 col-xl-6 col-lg-7 col-md-12">
          <SearchByAmount onSearch={handleSearchByAmount} />
        </div>
      </div>
      <table className="table-responsive w-100 table-striped table table-bordered">
        <thead>
          <tr>
            <th className="bg-dark text-white text-nowrap">
              <i className="fa-solid fa-user text-white"></i> Customer Name
            </th>
            <th className="bg-dark text-white">Date</th>
            <th className="bg-dark text-white">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions?.map((transaction) => {
            const customer = customers.find((c) => c.id == transaction.customer_id);
            return (
              <tr
                key={transaction.id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onCustomerSelect();
                  dispatch(SetCurrentCustomer(customer.id));
                }}
              >
                <td className="text-nowrap">{customer.name}</td>
                <td className="text-nowrap">{transaction.date}</td>
                <td className="text-nowrap">{transaction.amount} $</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
