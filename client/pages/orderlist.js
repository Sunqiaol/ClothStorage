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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tracking Orders</h1>
          <button
            onClick={userSignout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            LOGOUT
          </button>
        </div>

        <div className="mb-8">
         
          { <AddOrderForm fetchOrderData={fetchOrderData} />}
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
                {orders.map(order => (
                  <tr key={order.orderId} className="hover:bg-gray-100 cursor-pointer" onClick={() => openEditOrderModal(order)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.createdDate ? order.createdDate.split('T')[0] : 'N/A'}</td> {/* Format createdDate */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.deliveryDate ? order.deliveryDate.split('T')[0] : 'N/A'}</td> {/* Format deliveryDate */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderTotal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.shippingAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
