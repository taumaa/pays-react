import React from 'react';
import useFetchAllCountries from '../hooks/useFetchAllCountries';
import Loading from '../components/Loading';
import CountryList from '../components/CountryList';

const Home = () => {
  const { countries, isLoading, isError } = useFetchAllCountries();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error!</h2>
          <p>Failed to load countries. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CountryList 
        countries={countries} 
        emptyMessage="No countries found. Please try again later."
      />
    </div>
  );
};

export default Home;
