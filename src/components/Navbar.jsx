import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHome, FiList } from 'react-icons/fi';

const Navbar = () => {

  return (
    <nav className="bg-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <FiShoppingBag className="text-blue-500 w-6 h-6" />
        <Link to="/" className="text-lg font-semibold text-gray-700">
          Bazar Online
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="flex items-center text-gray-700 hover:text-blue-500">
          <FiHome className="mr-1" /> Inicio
        </Link>
        <Link to="/sales" className="flex items-center text-gray-700 hover:text-blue-500">
          <FiList className="mr-1" /> Compras
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
