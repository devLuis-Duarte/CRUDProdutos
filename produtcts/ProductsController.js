const express = require("express");
const Product = require("./Product");
const User = require("../users/User");
const ProductUser = require("../productUser/ProductUser");
const sequelize = require("sequelize");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/product/create", (req, res) => {
    var id = req.body.id;

    User.findByPk(id).then((user) => {
        res.render("products/create", {
            user: user
        });
    })
});

router.post("/product/save", (req, res) => {
    var name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;
   
    const user = req.session.user;

    Product.create({
        name: name,
        quantity: quantity,
        price: price
    }).then((product) => {
        ProductUser.create({
            userId: user.id,
            productId: product.id   
        })
        res.render("products/index", {
            product: product
        })
    }).catch((error) => {
        res.redirect("/");
    })

});

module.exports = router;