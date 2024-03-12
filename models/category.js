const sequelize = require('../utility/database');
const Sequlize = require('sequelize');

const Category = sequelize.define('category',{
    id:{
        type: Sequlize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
    },
    name : Sequlize.STRING,

    description : {
        type: Sequlize.STRING,
        allowNull: true,
    }
});

module.exports = Category;