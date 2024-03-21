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
                userId: user.id
            }
        }).then((products) => {
            res.render("products/index", {
                products: products,
                user: user
            })
        })
    }else {
        res.redirect("/");
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

    if(name && quantity && price){
        if(user){
            Product.create({
                name: name,
                quantity: quantity,
                price: price,
                userId: userId
            }).then(() => {
                req.flash('success', 'Produto cadastrado com sucesso!');
                res.redirect("/products");
            }).catch((error) => {
                res.redirect("/");
            })
        }
    }else {
        req.flash('error', 'Por favor, preencha todos os campos!');
        res.redirect("/product/create");
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

router.post("/product/update", (req, res) => {
    const user = req.session.user;
    var id = req.body.productId;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;

    if(!name || !quantity || !price){
        req.flash('error', 'Atualize ao menos um dos campos!');
        res.redirect("/product/edit/"+id);
    }else {
        if(user){
            Product.update({
                name: name,
                quantity: quantity,
                price: price,
            }, {
                where: {
                    id: id
                }
            }).then(() => {
                req.flash('success', 'Produto atualizado com sucesso!');
                res.redirect("/products");
            })
        }else {
            res.redirect("/");
        }
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
         res.redirect("/products");
    })
 }else {
    res.redirect("/");
 }

});

module.exports = router;