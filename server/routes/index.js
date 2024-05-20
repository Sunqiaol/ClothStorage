const express = require('express');
const app = express();
const order = require('./order');





app.use('/order',order);

module.exports = app;