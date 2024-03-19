const express = require("express");
const Product = require("./Product");
const User = require("../users/User");
const sequelize = require("sequelize");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/product/create", (req, res) => {
    const user = req.session.user;
    
    if(user){
        res.render("products/create", {
            user: user
        })
    }else {
        res.redirect("/");
    }
});

router.post("/product/save", (req, res) => {
    const user = req.session.user;

    var name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var userId = req.body.userId;

    if(user){
        Product.create({
            name: name,
            quantity: quantity,
            price: price,
            userId: userId
        }).then((products) => {
            res.render("products/create", {
                product: products,
                user: user
            })
        }).catch((error) => {
            res.redirect("/");
        })
    }

});

module.exports = router;