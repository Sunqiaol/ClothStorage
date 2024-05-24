import React, { useState } from 'react';
import axios from 'axios';

const AddOrderForm = ({ fetchOrderData }) => {
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('Pending');
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [orderTotal, setOrderTotal] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    const toggleModal = () => {
        setShowModal(prev => !prev);
    };

    const addOrder = async (event) => {
        event.preventDefault();
        const updatedDeliveryDate = deliveryDate ? new Date(deliveryDate).toISOString().split('T')[0] : null;
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + '/api/order/addOrder', {
                orderId,
                createdDate: new Date(createdDate).toISOString().split('T')[0], // Format createdDate
                customerName,
                status,
                deliveryDate: updatedDeliveryDate, // Format deliveryDate
                orderTotal,
                shippingAddress,
            });

            if (response.status === 201) {
                alert('Order added successfully!');
                fetchOrderData();
                resetForm();
                setShowModal(false);
            } else {
                alert('Error adding order');
            }
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const resetForm = () => {
        setOrderId('');
        setCreatedDate('');
        setCustomerName('');
        setStatus('Pending');
        setDeliveryDate('');
        setOrderTotal('');
        setShippingAddress('');
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Order</h2>
                        <form id="orderForm" onSubmit={addOrder} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="orderId" className="text-sm font-medium text-gray-700 mb-1">Order ID</label>
                                <input
                                    type="text"
                                    id="orderId"
                                    name="orderId"
                                    required
                                    placeholder="Order ID"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="createdDate" className="text-sm font-medium text-gray-700 mb-1">Created Date</label>
                                <input
                                    type="date"
                                    id="createdDate"
                                    name="createdDate"
                                    required
                                    value={createdDate}
                                    onChange={(e) => setCreatedDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="customerName" className="text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    required
                                    placeholder="Customer Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                                <input
                                    type="date"
                                    id="deliveryDate"
                                    name="deliveryDate"
                                    value={deliveryDate}
                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="orderTotal" className="text-sm font-medium text-gray-700 mb-1">Order Total</label>
                                <input
                                    type="number"
                                    id="orderTotal"
                                    name="orderTotal"
                                    placeholder="Order Total"
                                    value={orderTotal}
                                    onChange={(e) => setOrderTotal(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="shippingAddress" className="text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                                <input
                                    type="text"
                                    id="shippingAddress"
                                    name="shippingAddress"
                                    required
                                    placeholder="Shipping Address"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                                >
                                    Add Order
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
            <div className="mb-8">
                <button
                    onClick={toggleModal}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                    Add New Order
                </button>
            </div>
        </>
    );
};

export default AddOrderForm;
