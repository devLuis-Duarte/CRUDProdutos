//imports
const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const session = require("express-session");

//connection
const connection  = require("./database/database");

//models
const User = require("./users/User");
const Product = require("./produtcts/Product");
const ProductUser = require("./productUser/ProductUser");

//controllers
const UserController = require("./users/UsersController");
const ProductsController = require("./produtcts/ProductsController");


//view engine
app.set('view engine', 'ejs');

//public folder
app.use(express.static('public'));

//body-parser
app.use(BodyParser.urlencoded({extended: true}));

//sessão do usuario
app.use(session({
    secret: "somesecretword",
    cookie: {maxAge: 300000}
}));

//conexao com banco
connection.authenticate().then(() => {
    console.log("servidor conectado com sucesso");
});


app.use("/", UserController);
app.use("/", ProductsController);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000, () => {
    console.log("servidor rodando");
});
