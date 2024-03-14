const express = require("express");
const router = express.Router();
const User = require("./User");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");

router.get("/user/create", (req, res) => {
    res.render("users/create");
});

router.post("/user/save", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    if(email != undefined){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        User.create({
            name: name,
            email: email,
            password: hash,

        }).then((user) => {
            res.render("users/create", {
                user: user,
            })
        })
    }else {
        res.redirect("/");
    }
});

router.get("/user/login", (req, res) => {
    const user = req.session.user;
    
    if(user){
        res.render("products/index");
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
                res.render("products/index");
            }else {
                res.redirect("/user/login")
            }
        }else {
            res.redirect("/user/create");
        }
    })
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;
