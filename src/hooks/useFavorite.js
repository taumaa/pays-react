import { useState, useEffect } from 'react';

const useFavorite = () => {
  // Initialize with data from localStorage instead of empty array
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Remove the initial load effect since we're loading in the initial state
  // Only keep the effect that updates localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country) => {
    setFavorites((prevFavorites) => {
      // Check if the country is already in favorites to avoid duplicates
      if (!prevFavorites.some((fav) => fav.cca3 === country.cca3)) {
        return [...prevFavorites, country];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (countryCca3) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((country) => country.cca3 !== countryCca3)
    );
  };

  const isFavorite = (countryCca3) => {
    return favorites.some((country) => country.cca3 === countryCca3);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorite;