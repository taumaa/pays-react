import React from 'react';
import { Link } from 'react-router-dom';
import useFavorite from '../hooks/useFavorite';

const CountryCard = ({ country }) => {
  // Extract country data
  const name = country.name.common;
  const flag = country.flags.svg;
  const currencies = country.currencies ? Object.values(country.currencies).map(currency => 
    `${currency.name} (${currency.symbol})`
  ).join(', ') : 'No currency data';
  const countryCode = country.cca2;
  
  // Use the favorite hook
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const isCountryFavorite = isFavorite(country.cca3);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    if (isCountryFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Link to={`/country/${encodeURIComponent(name)}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
          aria-label={isCountryFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isCountryFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          )}
        </button>
        <div className="h-40 overflow-hidden">
          <img 
            src={flag} 
            alt={`Flag of ${name}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Country Code:</span> {countryCode}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Currency:</span> {currencies}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard; 