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
serv.use('/images', express.static(__dirname + '/upload/images'));
serv.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
    }),
);
serv.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
// Les différentes routes possibles
serv.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("<h1>Home page</h1>");
});
serv.use('/api/', require('./routes/apiRouter'));

serv.listen(process.env.APP_PORT, function () {
    console.log("serv running on port : ", process.env.APP_PORT);
});