import { useEffect, useState } from 'react';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('https://bazaruniversal20241107172637.azurewebsites.net/api/Ventas/sales')
      .then(response => response.json())
      .then(data => setSales(data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Compras Registradas</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.idventa} className="text-center border-b hover:bg-gray-100">
                <td className="px-6 py-4">{sale.producto}</td>
                <td className="px-6 py-4">{sale.cantidad}</td>
                <td className="px-6 py-4">{new Date(sale.fechaVenta).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">${sale.totalVenta.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;
