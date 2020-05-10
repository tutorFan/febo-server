const Sequelize = require('sequelize');
const readlineSync = require('readline-sync');

module.exports = new Sequelize('7dUTOVQsUZ', '7dUTOVQsUZ', 'vealAPvu72', {
    host: 'www.remotemysql.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

