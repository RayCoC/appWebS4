var express = require('express');
var userController = require('../Contoller/usersController');
var itemController = require('../Contoller/ItemsController');
var conn = require("../config/database");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var apiRouter = express.Router();

apiRouter.post('/inscription',userController.inscription);
apiRouter.post("/connexion",userController.login);
apiRouter.post('/logout', userController.logout);
apiRouter.get('/userInformations', function (req,res,next) {
   console.log(req.session);
});
apiRouter.post("/addItem", itemController.addItem);
module.exports = apiRouter;