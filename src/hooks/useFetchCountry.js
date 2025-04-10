import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    if (!countryName) {
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      
      if (response.data && response.data.length > 0) {
        setCountry(response.data[0]);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Error fetching country:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [countryName]);

  return { country, isLoading, isError, fetchData };
};

export default useFetchCountry; 