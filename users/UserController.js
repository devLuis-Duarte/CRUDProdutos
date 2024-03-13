const express = require("express");
const router = express.Router();
const User = require("./User");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

router.get("/user/create", (req, res) => {
    res.render("users/create");
});

router.post("/user/save", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    if(email != undefined){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.compareSync(password, salt);

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
})

module.exports = router;

