import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useRouter } from 'next/router';

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const addOrder = async (event) => {
    event.preventDefault();
    const orderId = document.getElementById('orderId').value;
    const date = document.getElementById('date').value;

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + '/api/order/addOrder', {
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

  const userSignout = () => {
    signOut(auth).then(() => {
      router.push('/login');
    }).catch((error) => {
      console.error('Error Signing Out:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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

      <button onClick={userSignout}>LOGOUT</button>
    </div>
  );
}

export default Orderlist;
