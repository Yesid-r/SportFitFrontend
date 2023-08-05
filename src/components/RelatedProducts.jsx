import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import { BASE_URL } from '../utils/config';

const RelatedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/product/getAll`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(`data: ${data.data}`)
          
          setProducts(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Todos los productos</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
