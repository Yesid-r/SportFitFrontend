import React, { useState, useEffect } from 'react';

const ListSells = () => {
    const [sells, setSells] = useState([]);

    // Función para obtener los datos de la API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/sell');
            const data = await response.json();
            if (data.status) {
                setSells(data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="py-8 max-w-screen-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Lista de ventas</h2>
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Valor unitario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de venta</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sells.map((sell) => (
                            <tr key={sell._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{sell.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{sell.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${(sell.total / sell.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${sell.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(sell.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSells;
