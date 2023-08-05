import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const ProductCard = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSellAlert, setShowSellAlert] = useState(false);
  const [sellQuantity, setSellQuantity] = useState(0);
  const navigate = useNavigate();

  const onSell = (id) => {
    setShowSellAlert(true);
  };

  const onDeleteProduct = (id) => {
    setShowAlert(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/remove/${id}`, { method: 'DELETE' });

      if (response.ok) {
        console.log(`Producto con id ${id} eliminado correctamente.`);
        setShowAlert(false);
        window.alert('Producto eliminado exitosamente.');
        // onDelete(id, true);
        navigate('/');
      } else {
        console.error(`Error al eliminar el producto con id ${id}`);
        setShowAlert(false);
        window.alert('Hubo un error al eliminar el producto.');
        onDelete(id, false);
      }
    } catch (error) {
    console.log(error)
    }
  };

  const closeModal = () => {
    setShowAlert(false);
    setShowSellAlert(false);
  };

  const handleSellAlertClose = () => {
    setShowSellAlert(false);
  };

  const handleSellConfirm =  async () => {
    console.log(`Vender ${sellQuantity} unidades del producto con id: ${product._id}`);

    try {
      const response = await fetch(`${BASE_URL}/api/product/updateStock/${product._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: sellQuantity, "stock": product.stock,"name":product.name, "price":product.price}),
      });
      console.log(response)
      if (response.status === 200) {
        console.log(`Producto con id ${product._id} actualizado correctamente.`);
        setShowSellAlert(false);
        window.alert('Producto actualizado exitosamente.');
        navigate('/');
      } else {
        console.error(`Error al actualizar el producto con id ${product._id}`);
        setShowSellAlert(false);
        window.alert('Hubo un error al actualizar el producto.');
      }
    } catch (error) {
      
    }
    setShowSellAlert(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Link to={{ pathname: `/${product._id}`, state: { product } }}>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
      </Link>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-gray-500 mb-2">Category: {product.category}</p>
      <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
      <div className="flex justify-between">
        <button onClick={() => onSell(product._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Vender
        </button>
        <button onClick={() => onDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Eliminar
        </button>
      </div>
      {showAlert && (
        <div className="fixed top-0 h-24 left-0 right-0 p-4 bg-red-500 text-white">
          <p className="text-lg font-bold">¿Estás seguro de eliminar el producto {product.name}?</p>
          <div className="flex justify-end mt-2">
            <button onClick={() => closeModal()} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2">
              Cancelar
            </button>
            <button onClick={() => handleDelete(product._id)} className="bg-white text-red-500 hover:text-red-600 px-4 py-2 rounded">
              Eliminar
            </button>
          </div>
        </div>
      )}
      {showSellAlert && (
        <div className="fixed top-0 h-24 left-0 right-0 p-4 bg-blue-500 text-white">
          <p className="text-lg font-bold">¿Cuántos productos quieres vender de {product.name}?</p>
          <div className="flex justify-end mt-2">
            <input
              type="number"
              value={sellQuantity}
              onChange={(e) => setSellQuantity(parseInt(e.target.value))}
              className="bg-white text-blue-500 px-2 py-1 rounded"
              min="1"
            />
            <button onClick={() => handleSellAlertClose()} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2">
              Cancelar
            </button>
            <button onClick={() => handleSellConfirm()} className="bg-white text-blue-500 hover:text-blue-600 px-4 py-2 rounded ml-2">
              Vender
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
