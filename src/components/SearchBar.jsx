import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../hooks/useSearch';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useSearch(searchTerm);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button 
        onClick={toggleModal} 
        className="focus:outline-none text-blue-500 hover:text-blue-600"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div 
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Rechercher un pays</h3>
              <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Entrez le nom d'un pays..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {loading && <p className="text-center py-2 text-gray-700">Chargement...</p>}
              
              {error && <p className="text-center text-red-500 py-2">{error}</p>}
              
              {!loading && !error && data.length > 0 && (
                <ul className="divide-y divide-gray-200">
                  {data.map((country) => (
                    <li key={country.cca3} className="py-2">
                      <Link 
                        to={`/country/${country.name.common}`}
                        className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded text-gray-800"
                        onClick={() => setIsOpen(false)}
                      >
                        <img 
                          src={country.flags.svg} 
                          alt={`Drapeau ${country.name.common}`} 
                          className="w-8 h-6 object-cover border border-gray-200"
                        />
                        <span>{country.name.common}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              
              {!loading && !error && searchTerm && data.length === 0 && (
                <p className="text-center py-2 text-gray-700">Aucun résultat trouvé</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
