const express = require("express");
const router = express.Router();

router.get("/product/create", (req, res) => {
    res.render("products/create");
});

module.exports = router;