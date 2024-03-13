const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/user/create", (req, res) => {
    res.send("ola");
});

module.exports = router;

