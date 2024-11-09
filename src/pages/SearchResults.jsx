import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FiStar, FiSearch } from 'react-icons/fi';
import { FaShoppingBag } from 'react-icons/fa';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(new URLSearchParams(useLocation().search).get("search") || "");
  const [query, setQuery] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://bazaruniversal20241107172637.azurewebsites.net/api/Productos/items?q=${query}`);
        const data = await response.json();
        
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  const handleSearch = () => {
    setQuery(searchTerm);
    navigate(`/items?search=${searchTerm}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-6">
        <FaShoppingBag className="text-black w-8 h-8" />
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg p-2">
          <FiSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="flex-grow bg-transparent outline-none text-gray-700 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
          Buscar
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Resultados de la búsqueda de &quot;{query}&quot;: {products.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link
            to={`/item/${product.idproducto}`}
            key={product.idproducto}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.fondo}
              alt={product.titulo}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-1">{product.titulo}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.categoria}</p>
              <p className="text-gray-600 flex-grow text-sm">{product.descripcion}</p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FiStar key={index} className={`w-5 h-5 ${index < Math.round(product.clasificacion) ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-xl font-bold text-gray-900">${product.precio.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
