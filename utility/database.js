/*const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    database : 'node-app',
    password : '2015',
});

module.exports = connection.promise();*/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-app-orm', 'root', '2015', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = sequelize;