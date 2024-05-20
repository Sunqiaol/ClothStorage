const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');


const order = db.define('order', {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    }


}, {
    tableName: 'orders', // Explicitly define the table name
    timestamps: false,  // Disable timestamps if not needed
});

module.exports = order;