var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require("dotenv").config();
var conn = require("../config/database");

    exports.inscription =  (req, res, next) => {

        var login = req.body.login;
        var nom = req.body.nom;
        var password = req.body.password;

        if (login == null || nom == null || password==null) {
            return res.json({'messsage': 'Certains champs sont vides'});
        } else if (password.length < 3) {
            return res.json({"message": 'votre mot de passe est trop court !'});
        }
        conn.query('SELECT idUtilisateur from utilisateur where login = ?',[login], async (err, result) => {
            if (result.length>0) {
                return res.json({"message": 'Le nom d utilisateur exite déjà'});
            } else {
                await bcrypt.hash(req.body.password, 8, (err, hash) => {
                    if (err) {
                        return res.json({"message": err});
                    } else {
                        conn.query(`insert into utilisateur (nomUtilisateur,login,password) values ("${nom}","${login}","${hash}");`, (err, result) => {
                            if (err) {
                                throw err;
                                return res.status(500).json({"message": err});
                            }
                            return res.status(200).json({"message" : "Inscription effectué !"});
                        });
                    }
                });
            }
        });
    }
    exports.login = (req,res, next) => {
        const login = req.body.login;
        const password = req.body.password;

        if (login == null || password == null || password == "" ||login =="") {
            return res.json({"message" : "Aucun champ ne doit être vide !"});
        }
        conn.query("SELECT * from utilisateur where login = ?", [login], async (err, resultat) => {
            if (!resultat || !(await bcrypt.compare(password, resultat[0].password))) {
                return res.json({"message" : "login ou mot de passe incorrect"});
            }
            else {
                var id = resultat[0].idUtilisateur
                var token = jwt.sign({idUtilisateur : id}, process.env.ACCESS_TOKEN, {expiresIn: "10h"});
                req.session.userID = id;
                req.session.token = token;
                return res.status(200).json({"message" : "connecté", token, user: resultat[0]}); // res.redirect("/"); une fois que j'aurai le front end
            }
        });
    }
    exports.logout = (req,res,next) => {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.send('Unable to log out')
                } else {
                    res.send('Logout successful');
                }
            });
        } else {
            res.end()
        }
    }
    exports.userInformations = (req,res,next) => {
        
    }