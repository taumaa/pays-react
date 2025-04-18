import React from 'react';
import useFavorite from '../hooks/useFavorite';
import CountryList from '../components/CountryList';
import { Link } from 'react-router-dom';

const Favorite = () => {
  const { favorites } = useFavorite();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Favorite Countries</h1>
      
      {favorites.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">You haven't added any countries to your favorites yet.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Countries
          </Link>
        </div>
      ) : (
        <CountryList 
          countries={favorites} 
          emptyMessage="You haven't added any countries to your favorites yet."
        />
      )}
    </div>
  );
};

export default Favorite;
