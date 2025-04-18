import React from 'react';
import useFetchAllCountries from '../hooks/useFetchAllCountries';
import CountryCard from '../components/CountryCard';
import Loading from '../components/Loading';
import { motion } from "motion/react"

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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country, index) => (
          <motion.div
            key={country.cca3}
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <CountryCard country={country} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
