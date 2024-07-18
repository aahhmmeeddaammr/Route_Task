import { useEffect, useState } from 'react';
import { getTransactions } from '../api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions().then((response) => {
      setTransactions(response.data);
      setFilteredTransactions(response.data);
      setLoading(false);
    });
  }, []);

  return { transactions, filteredTransactions, setFilteredTransactions, loading };
};
