import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiSearch } from 'react-icons/fi';
import { FaShoppingBag } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://bazaruniversal20241107172637.azurewebsites.net/api/Productos/items/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleSearch = () => {
    navigate(`/items?search=${searchTerm}`);
  };

  const handlePurchase = () => {
    const saleData = {
      idventa: 0,
      idproducto: product.idproducto,
      cantidad: 1,
      fechaVenta: new Date().toISOString(),
      totalVenta: product.precio,
    };

    fetch('https://bazaruniversal20241107172637.azurewebsites.net/api/Ventas/addSale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData)
    }).then(response => {
      if (response.ok) {
        toast.success("Compra realizada con éxito!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error al realizar la compra. Intenta de nuevo.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  if (!product) return <div className="text-center text-gray-500">Cargando...</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <FaShoppingBag className="text-gray-800 w-8 h-8" />
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-md p-2">
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
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none"
        >
          Buscar
        </button>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center mb-2 text-gray-800">{product.titulo}</h2>
        <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-4">{product.categoria}</p>
        <div className="flex space-x-3 justify-center mb-6">
          {product.imagenes && product.imagenes.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.titulo}-${idx}`}
              className="w-16 h-16 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mb-4 leading-relaxed">{product.descripcion}</p>
        <div className="flex justify-center items-center mb-6 space-x-4">
          <p className="text-2xl font-bold text-blue-600">${product.precio.toLocaleString()}</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <FiStar
                key={index}
                className={`w-5 h-5 ${index < Math.round(product.clasificacion) ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handlePurchase}
          className="w-full py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none"
        >
          Comprar
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
