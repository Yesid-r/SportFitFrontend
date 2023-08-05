import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { BASE_URL } from '../utils/config';

const categories = ['Fitness', 'Running', 'Cycling', 'Football', 'Basketball', 'Tennis', 'Swimming', 'Other'];

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/product/getAll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredProducts = products;

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter);
    }

    if (minPriceFilter) {
      filteredProducts = filteredProducts.filter((product) => product.price >= parseInt(minPriceFilter));
    }

    if (stockFilter) {
      filteredProducts = filteredProducts.filter((product) => product.stock >= parseInt(stockFilter));
    }

    if (nameFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  }, [products, categoryFilter, minPriceFilter, stockFilter, nameFilter]);

  const clearFilters = () => {
    setCategoryFilter('');
    setMinPriceFilter('');
    setStockFilter('');
    setNameFilter('');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Todos los productos</h2>

        
        <form className="mt-6 space-y-4 flex flex-wrap justify-between">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Categoría:</label>
            <select
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Precio mínimo:</label>
            <input
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="number"
              value={minPriceFilter}
              onChange={(e) => setMinPriceFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Stock:</label>
            <input
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="number"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Nombre:</label>
            <input
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          
          <div>
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={clearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </form>

        
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
