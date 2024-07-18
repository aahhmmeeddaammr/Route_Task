import { useEffect, useState } from 'react';
import { getCustomers } from '../api';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers().then((response) => {
      setCustomers(response.data);
      setLoading(false);
    });
  }, []);

  return { customers, loading };
};

