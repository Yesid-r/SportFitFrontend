import React, { useState } from 'react';
import { BASE_URL } from '../utils/config';

const RegisterProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
        image: '',
    });
    const categories = ['Fitness', 'Running', 'Cycling', 'Football', 'Basketball', 'Tennis', 'Swimming', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [responseMessage, setResponseMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            // Send the form data to the API endpoint
            const response = await fetch(`${BASE_URL}/api/product/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save the product');
                setResponseMessage('Failed to save the product');
            }
            setResponseMessage('Product saved successfully');
            const data = await response.json();
            // Handle the response data if needed
            console.log(data);
        } catch (error) {
            // Handle errors
            console.error('Error saving product:', error);
            setResponseMessage(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-12 shadow-md border border-gray-300 rounded-md mt-7 mb-3">
            {responseMessage && (
                <div className={`p-4 rounded-md ${responseMessage.includes('success') ? 'bg-green-200' : 'bg-red-200'}`}>
                    <p className={`text-sm font-medium ${responseMessage.includes('success') ? 'text-green-800' : 'text-red-800'}`}>
                        {responseMessage}
                    </p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Price
                        </label>
                        <div className="mt-1">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                            Category
                        </label>
                        <div className="mt-1">
                            <select
                                id="category"
                                name="category"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                                value={formData.category} // Establecemos el valor seleccionado
                            >
                                <option value="">Select a category</option> {/* Opción por defecto */}
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                        </label>
                        <div className="mt-1">
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-1 flex items-center gap-x-3">
                            <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>
                            <input
                                id="image"
                                name="image"
                                type="text"
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterProduct;
