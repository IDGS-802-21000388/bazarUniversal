import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${query}`);
  };

  const handleViewSales = () => {
    navigate('/sales');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <FiShoppingBag className="w-16 h-16 text-blue-500 mb-4" />
      <h1 className="text-4xl font-bold mb-6 text-center">Bazar Online</h1>
      <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg p-2 mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="flex-grow bg-transparent outline-none text-gray-700 px-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </div>
      <button
        onClick={handleViewSales}
        className="mt-4 px-6 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none"
      >
        Ver Compras
      </button>
    </div>
  );
};

export default Home;
