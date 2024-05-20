const express = require('express');
const router = express.Router();
const Order = require('../models/order');

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
    const {orderId, date} = req.body;
    try {
        const newOrder = await Order.create({orderId,date});
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error Adding orders:', error);
        res.status(500).json({ error: 'An error occurred while Adding orders' });
    }
});
module.exports = router;