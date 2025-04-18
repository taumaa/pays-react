import React, { useState } from 'react';
import CountryCard from './CountryCard';
import { motion } from "motion/react";
import Button from './Button';
const CountryList = ({ countries, emptyMessage = "No countries to display" }) => {
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', or 'desc'
  
  // Sort countries based on the current sort order
  const sortedCountries = [...countries].sort((a, b) => {
    if (sortOrder === 'none') return 0;
    
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    
    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Function to cycle through sort orders
  const handleSort = () => {
    if (sortOrder === 'none') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('none');
  };

  if (countries.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleSort}>
          <span>Sort by Name</span>
          {sortOrder === 'none' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          )}
          {sortOrder === 'asc' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          )}
          {sortOrder === 'desc' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedCountries.map((country, index) => (
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
    </>
  );
};

export default CountryList; 