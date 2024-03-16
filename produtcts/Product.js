const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");

const Product = connection.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
});

Product.sync({force: false});

module.exports = Product;