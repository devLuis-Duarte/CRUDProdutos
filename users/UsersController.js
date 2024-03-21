const express = require("express");
const router = express.Router();
const User = require("./User");
const Product = require("../produtcts/Product");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {validationResult} = require("express-validator");
const flash = require("express-flash");

router.get("/user/create", (req, res) => {
    res.render("users/create");
});

router.post("/user/save", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    if(!name && !email && !password){
        req.flash('error', 'Por favor preencha todos os campos!');
        return res.redirect("/user/create");
    }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        User.create({
            name: name,
            email: email,
            password: hash,

        }).then((user) => {
            req.flash('success', 'Usuário cadastrado com sucesso!');
            res.render("users/create", {
                user: user,
            })
        })
});

router.get("/user/login", (req, res) => {
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
            });
        })
    }else {
        res.render("users/login");
    }
})

router.post("/user/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                Product.findAll({
                    where: {
                        userId: user.id
                    }
                }).then((products) => {
                    res.render("products/index", {
                        user: user,
                        products: products
                    });
                })
            }else {
                req.flash('error', 'Senha incorreta!');
                res.redirect("/user/login")
            }
        }else {
            req.flash('error', 'E-mail ou usuário inválido!');
            res.redirect("/user/login");
        }
    })
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;

