const express = require('express');
const app = express();
const order = require('./order');
const user = require('./user');




app.use('/order',order);
app.use('/user',user);
module.exports = app;