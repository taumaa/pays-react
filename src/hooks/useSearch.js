import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearch = (searchTerm) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Aucun pays trouvé ou erreur réseau');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return { data, loading, error };
};

export default useSearch;
