const express = require("express");
const Product = require("./Product");
const User = require("../users/User");
const sequelize = require("sequelize");
const router = express.Router();
const bodyParser = require("body-parser");


router.get("/products", (req, res) => {
    const user = req.session.user;
    
    if(user){
        Product.findAll({
            where: {
                id: user.id
            }
        }).then((products) => {
            res.render("products/index", {
                products: products,
                user: user
            })
        })
    }
})

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

router.get("/product/edit/:id", (req, res) => {
    const user = req.session.user;
    
    if(user){
        var id = req.params.id;

        if(!isNaN(id)){
            Product.findByPk(id).then((product) => {
                res.render("products/edit", {
                    product: product, 
                    user: user
                });
            })
        }else {
            res.redirect("/");
        }
    }else {
        res.redirect("/");
    }
});

router.post("/product/delete", (req, res) => {
   const user = req.session.user;
   var productId = req.body.productId;

   if(user){
    Product.destroy({
        where: {
            id: productId
        }
   }).then(() => {
        res.redirect("/");
   })
   }

});

module.exports = router;