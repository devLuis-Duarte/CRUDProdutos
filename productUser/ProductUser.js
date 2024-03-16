const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");
const Product = require("../produtcts/Product");

const ProductUser = connection.define('productUser', {
    userId: {
        type: Sequelize.INTEGER,
        references: {model: User}
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {model: Product}
    },
    
});

Product.belongsToMany(User, { through: ProductUser, foreignKey: 'userId' });
User.belongsToMany(Product, { through: ProductUser, foreignKey: 'productId'});

ProductUser.sync({force: false});

module.exports = ProductUser;