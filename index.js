const express = require("express");
const app = express();
const connection  = require("./database/database");
const User = require("./users/User");
const UserController = require("./users/UserController");
const BodyParser = require("body-parser");
const session = require("express-session");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(BodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "somesecretword",
    cookie: {maxAge: 300000}
}));

connection.authenticate().then(() => {
    console.log("servidor conectado com sucesso");
});


app.use("/", UserController);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000, () => {
    console.log("servidor rodando");
});
