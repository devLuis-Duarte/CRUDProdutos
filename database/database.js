const Sequelize = require("sequelize");
const connection = new Sequelize('estoque', 'root', 'luismiguel123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;