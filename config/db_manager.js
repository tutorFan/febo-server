const Sequelize = require('sequelize');
const readlineSync = require('readline-sync');

module.exports = new Sequelize('telephonebook', 'user', 'user@2020', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

