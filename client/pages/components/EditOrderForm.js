import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditOrderForm = ({ order, fetchOrderData, closeModal }) => {
    const [orderId, setOrderId] = useState(order?.orderId || '');
    const [createdDate, setCreatedDate] = useState(order.createdDate.substring(0, 10));
    const [customerName, setCustomerName] = useState(order.customerName);
    const [status, setStatus] = useState(order.status);
    const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate ? order.deliveryDate.substring(0, 10) : null); // Handle null case
    const [orderTotal, setOrderTotal] = useState(order.orderTotal);
    const [shippingAddress, setShippingAddress] = useState(order.shippingAddress);
    console.log(createdDate);
    const updateOrder = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_SERVER_URL + '/api/order/updateOrder', {
                orderId,
                createdDate: new Date(createdDate).toISOString().split('T')[0], // Format createdDate
                customerName,
                status,
                deliveryDate: new Date(deliveryDate).toISOString().split('T')[0], // Format deliveryDate
                orderTotal,
                shippingAddress,
            });

            if (response.status === 200) {
                alert('Order updated successfully!');
                fetchOrderData();
                closeModal();
            } else {
                alert('Error updating order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
                <form onSubmit={updateOrder} className="space-y-4">
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
                            readOnly
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
                            onClick={closeModal}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                            Update Order
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditOrderForm;
