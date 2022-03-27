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
   console.log(req.session.userID);
});
apiRouter.post("/addItem/:id", upload.single('file'),token,itemController.addItem);
apiRouter.get("/items/:id", token, itemController.itemsOfAnUser);
apiRouter.post("/createCollection", itemController.createCollection);
apiRouter.post("/addItemToCollection/:itemID", itemController.addItemToCollection);
apiRouter.post("/deleteItem/:itemID", itemController.deleteItem);
apiRouter.get("/search/:title/:filter/:id", function (req,res,next) {
   var title = req.params.title;
   var filter = req.params.filter;
   if (title == "" || title == null || filter == "" || filter == null || title == "noSearch") {
      conn.query('SELECT * from objet where idUtilisateur <> ?',[req.params.id], (err, result) => {
         if (err) {
            throw err;
         }
         return res.json({"all" : result});
      });
   }
   else if (filter == "nomObjet") {
      conn.query("SELECT * from objet where nomObjet like ? and idUtilisateur <> ?", ['%'+title+'%', req.params.id], (err, result) => {
         if (err) {
            throw err;
         }
         if (result.length >0) {
            return res.json({"all" : result});
         }
         return res.json({"message" : "not found"});
      });
   }
   else if (filter=="typeObjet") {
      conn.query("SELECT * from objet where typeObjet like ? and idUtilisateur <> ?", ['%'+title+'%', req.params.id], (err, result) => {
         if (err) {
            throw err;
         }
         if (result.length >0) {
            return res.json({"all" : result});
         }
         return res.json({"message" : "not found"});
      });
   }
});
module.exports = apiRouter;