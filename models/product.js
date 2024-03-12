const sequelize = require('../utility/database');
const Sequlize = require('sequelize');

const Product = sequelize.define('product',{
    id:{
        type: Sequlize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
    },
    name : Sequlize.STRING,
    price : {
        type: Sequlize.STRING,
        allowNull: false,
    },
    imageUrl : {
        type: Sequlize.STRING,
        allowNull: false,
    },
    description : {
        type: Sequlize.STRING,
        allowNull: true,
    }
});

module.exports = Product;