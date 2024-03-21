//imports
const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

//connection
const connection  = require("./database/database");

//models
const User = require("./users/User");
const Product = require("./produtcts/Product");

//controllers
const UserController = require("./users/UsersController");
const ProductsController = require("./produtcts/ProductsController");


//view engine
app.set('view engine', 'ejs');

//public folder
app.use(express.static('public'));

//body-parser
app.use(BodyParser.urlencoded({extended: true}));

//flash messages
app.use(flash());
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
    Product.findAll({
        include: {model: User}
    }).then((products) => {
        res.render("home", {
            products: products,
        });
    })
});

app.listen(3000, () => {
    console.log("servidor rodando");
});
