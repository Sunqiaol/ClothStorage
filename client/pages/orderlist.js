import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import AddOrderForm from './components/AddOrderForm';
import EditOrderForm from './components/EditOrderForm';

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    orderId: '',
    createdDate: '',
    customerName: '',
    status: '',
    deliveryDate: '',
    orderTotal: '',
    shippingAddress: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20); // Number of orders per page
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loading) {
      fetchOrderData();
    }
  }, [loading]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/order/getAllOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const userSignout = () => {
    signOut(auth).then(() => {
      router.push('/login');
    }).catch((error) => {
      console.error('Error Signing Out:', error);
    });
  };

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
  };

  const openEditOrderModal = (order) => {
    setSelectedOrder(order);
    setShowEditOrderModal(true);
  };

  const closeEditOrderModal = () => {
    setSelectedOrder(null);
    setShowEditOrderModal(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredOrders = orders.filter(order =>
    (!filters.orderId || order.orderId.toString().includes(filters.orderId)) &&
    (!filters.createdDate || (order.createdDate && order.createdDate.includes(filters.createdDate))) &&
    (!filters.customerName || (order.customerName && order.customerName.toLowerCase().includes(filters.customerName.toLowerCase()))) &&
    (!filters.status || (order.status && order.status.toLowerCase().includes(filters.status.toLowerCase()))) &&
    (!filters.deliveryDate || (order.deliveryDate && order.deliveryDate.includes(filters.deliveryDate))) &&
    (!filters.orderTotal || order.orderTotal.toString().includes(filters.orderTotal)) &&
    (!filters.shippingAddress || (order.shippingAddress && order.shippingAddress.toLowerCase().includes(filters.shippingAddress.toLowerCase())))
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tracking Orders</h1>
          <button
            onClick={userSignout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            LOGOUT
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Search Orders</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <label htmlFor="orderId" className="text-sm font-medium text-gray-700">Order ID</label>
              <input
                type="text"
                name="orderId"
                id="orderId"
                placeholder="Order ID"
                value={filters.orderId}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="createdDate" className="text-sm font-medium text-gray-700">Date Received</label>
              <input
                type="date"
                name="createdDate"
                id="createdDate"
                placeholder="Date Received"
                value={filters.createdDate}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="customerName" className="text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                placeholder="Customer Name"
                value={filters.customerName}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-700">Order Status</label>
              <input
                type="text"
                name="status"
                id="status"
                placeholder="Order Status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700">Delivery Date</label>
              <input
                type="date"
                name="deliveryDate"
                id="deliveryDate"
                placeholder="Delivery Date"
                value={filters.deliveryDate}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="orderTotal" className="text-sm font-medium text-gray-700">Order Total</label>
              <input
                type="text"
                name="orderTotal"
                id="orderTotal"
                placeholder="Order Total"
                value={filters.orderTotal}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="shippingAddress" className="text-sm font-medium text-gray-700">Shipping Address</label>
              <input
                type="text"
                name="shippingAddress"
                id="shippingAddress"
                placeholder="Shipping Address"
                value={filters.shippingAddress}
                onChange={handleFilterChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
         
          {<AddOrderForm fetchOrderData={fetchOrderData} />}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Id</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Received</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Status</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Delivery Date</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Total</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Shipping Address</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map(order => (
                  <tr key={order.orderId} className="hover:bg-gray-100 cursor-pointer" onClick={() => openEditOrderModal(order)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.createdDate ? order.createdDate.split('T')[0] : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.deliveryDate ? order.deliveryDate.split('T')[0] : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderTotal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.shippingAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700"
              >
                Previous
              </button>
              {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md ml-2 focus:outline-none ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                className="px-3 py-1 rounded-md ml-2 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
      {showEditOrderModal && (
        <EditOrderForm
          order={selectedOrder}
          fetchOrderData={fetchOrderData}
          closeModal={closeEditOrderModal}
        />
      )}
    </div>
  );
}

export default Orderlist;

