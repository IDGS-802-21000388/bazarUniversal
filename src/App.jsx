import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import SalesList from './pages/SalesList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-7">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/sales" element={<SalesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
