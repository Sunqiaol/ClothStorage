const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');


const order = db.define('order', {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    createdDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('Pending', "Shipped", 'Delivered'),
        allowNull: false
    },

    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    orderTotal: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },


    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
},


    {
        tableName: 'orders', // Explicitly define the table name
        timestamps: false,  // Disable timestamps if not needed
    });

module.exports = order;