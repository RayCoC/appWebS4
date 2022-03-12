require("dotenv").config();
var express = require('express');
var serv = express();
var bodyParser = require('body-parser');
var conn = require("./config/database");
var session = require('express-session');
var cors = require('cors');

serv.use(cors());
serv.use(express.urlencoded({extended: true}));
serv.use(express.json());

serv.use(
    session({
        secret: process.env.SESSION_SECRET, // don't put this into your code at production.  Try using saving it into environment variable or a config file.
        resave : false,
        saveUninitialized : false,
    })
);
// Les différentes routes possibles
serv.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("<h1>Home page</h1>");
});
serv.use('/api/', require('./routes/apiRouter'));

serv.listen(process.env.APP_PORT, function () {
    console.log("serv running on port : ", process.env.APP_PORT);
});