import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchCountry from '../hooks/useFetchCountry';
import Loading from '../components/Loading';
import Button from '../components/Button';

const Country = () => {
  const { countryName } = useParams();
  const { country, isLoading, isError } = useFetchCountry(countryName);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError || !country) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error!</h2>
          <p>Country "{countryName}" not found.</p>
          <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
            &larr; Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  const currencies = country.currencies 
    ? Object.values(country.currencies).map(currency => 
        `${currency.name} (${currency.symbol})`
      ).join(', ') 
    : 'No currency data';

  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'No language data';

  const population = country.population 
    ? country.population.toLocaleString() 
    : 'Unknown';

  return (
    <div className="py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Countries
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={country.flags.svg} 
            alt={`Flag of ${country.name.common}`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {country.name.common} {country.flag}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium">Official Name:</span> {country.name.official}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Capital:</span> {country.capital ? country.capital.join(', ') : 'N/A'}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Region:</span> {country.region} ({country.subregion || 'N/A'})
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Population:</span> {population}
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium">Currencies:</span> {currencies}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Languages:</span> {languages}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Area:</span> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Country Codes:</span> {country.cca2}, {country.cca3}
              </p>
            </div>
          </div>
          
          {country.maps && country.maps.googleMaps && (
            <div className="mt-6">
              <Button onClick={() => window.open(country.maps.googleMaps, '_blank', 'noopener,noreferrer')}>
                View on Google Maps
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
