var express = require('express');
var userController = require('../Contoller/usersController');
var itemController = require('../Contoller/ItemsController');
var conn = require("../config/database");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var multer = require("multer");
var path = require("path");
var token = require("../Contoller/checkToken");

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './upload/images');
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
   storage: storage
})
var apiRouter = express.Router();

apiRouter.post('/inscription',userController.inscription);
apiRouter.post("/connexion",userController.login);
apiRouter.post('/logout', userController.logout);
apiRouter.get('/userInformations', function (req,res,next) {
   console.log(req.session);
});
apiRouter.post("/addItem", upload.single('file'),token,itemController.addItem);
module.exports = apiRouter;