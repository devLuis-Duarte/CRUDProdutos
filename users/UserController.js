const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/user/create", (req, res) => {
    res.render("users/create");
});

module.exports = router;

