const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const moment = require('moment');
// Define your routes here
router.get('/', (req, res) => {
    res.send('Order home page');
});

router.get('/getAllOrders', async (req, res) => {
    try {
        const orders = await Order.findAll(); // Fetch all orders from the database
        res.status(200).json(orders); // Send the orders as a JSON response
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
});


router.post('/addOrder', async (req, res) => {
    const { orderId,
        createdDate,
        customerName,
        status,
        deliveryDate,
        orderTotal,
        shippingAddress, } = req.body;
    try {
        const newOrder = await Order.create({
            orderId,
            createdDate,
            customerName,
            status,
            deliveryDate,
            orderTotal,
            shippingAddress,
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error Adding orders:', error);
        res.status(500).json({ error: 'An error occurred while Adding orders' });
    }
});


router.put('/updateOrder', async (req, res) => {
    const { orderId, createdDate, customerName, status, deliveryDate, orderTotal, shippingAddress } = req.body;
  
    try {
      const order = await Order.findOne({ where: { orderId } });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update the order attributes
      order.createdDate = createdDate;
      order.customerName = customerName;
      order.status = status;
      order.deliveryDate = deliveryDate;
      order.orderTotal = orderTotal;
      order.shippingAddress = shippingAddress;
  
      // Save the updated order
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;