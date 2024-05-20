import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Index() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/order/getAllOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addOrder = async (event) => {
    event.preventDefault();
    const orderId = document.getElementById('orderId').value;
    const date = document.getElementById('date').value;

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/api/order/addOrder', {
        orderId,
        date,
      });

      if (response.status === 201) {
        alert('Order added successfully!');
        fetchOrderData(); // Fetch updated list of orders after adding a new one
      } else {
        alert('Error adding order');
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div>
      <div>Tracking Orders</div>
      <div>
        <h1>Adding New Order</h1>
        <form id="orderForm" onSubmit={addOrder} className='mt-10'>
          <div className='space-x-5'>
            <input type="text" id="orderId" name="orderId" required placeholder='Enter Your Order ID' />
            <input type="date" id="date" name="date" required />
            <button type="submit">Add a new Order</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Order List</h2>
        <ul>
          {orders.map(order => (
            <li key={order.orderId}>
              {order.orderId} - {new Date(order.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Index;
