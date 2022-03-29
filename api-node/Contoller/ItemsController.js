require("dotenv").config();
var conn = require("../config/database");
    exports.addItem = (req, res, next) => {
            var name = req.body.name;
            var price = req.body.price;
            var desc = req.body.desc;
            var image = req?.file?.filename;
            var type = req.body.type;
            var collectionId = req.body.collectionId;

            if (name == "" || price == "" || image == "" || desc == "" || type == "") {
                return res.json({"message" : "Un champ est manquant"});
            }
            else if (! /^-?\d+$/.test(price)) {
                return res.json({"message" : "Le prix doit être un nombre !"});
            }
            conn.query("SELECT * from utilisateur natural join objet where idUtilisateur = ? and nomObjet = ?", [req.session.userID, name], (err, resultat) => {
                if (resultat.length > 0) {
                    return res.json({"message" : "Vous savez déjà publié cet article en ligne"});
                }
                else {
                    conn.query(`insert into objet (idUtilisateur,nomObjet,prix,image, description,typeObjet,idCollection) values ("${req.params.id}","${name}","${price}","${image}","${desc}","${type}","${collectionId}");`, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            return res.status(200).json({"message" : "objet ajouté !"});
                        }
                    });
                }
            });
    }
    exports.itemsOfAnUser = (req,res,next) => {
        conn.query("SELECT * from objet where idUtilisateur = ?", [req.params.id], (err, resultat) => {
            if (err) {
                throw err;
            }
            else if (resultat.length > 0) {
                return res.status(200).json({"userID" : req.params.id, "info" : resultat});
            }
        });
    }
    exports.createCollection = (req,res, next) => {
        var collectionName = req.body.nom;
        if (collectionName == null) {
            return res.json({"message": "La collection doit avoir un nom !"});
        }
        conn.query("SELECT * from collection where titreCollection = ? and idUtilisateur = ?", [req.body.Name, req.session.userID], (err, result) => {
            if (result.length > 0) {
                return res.json({"message": "Vous avez déjà crée une collection avec ce nom"});
            } else {
                conn.query(`insert into collection (titreCollection, idUtilisateur)
                            values ("${collectionName}","${req.params.userID}");`, (err, resultat) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                return res.json({"message" : "Collection crée", "collectionID" : resultat.insertId});
                            }
                });
            }
        });
    }
    exports.addItemToCollection = (req,res,next) => {
        if (req.params.itemID == null) {
            throw new error("Error");
        }
        else {
            conn.query("SELECT * from objet where idObjet = ?", req.params.itemID, (err, res) => {
                if (res[0].collectionID > 0) {
                    return res.json({"message" : "L'objet est déjà dans une collection"});
                }
            })
            console.log(req.params.collectionID);
            conn.query("update objet set idCollection = ? where idObjet = ?", [req.params.collectionID, req.params.itemID],(err, resultat) => {
                return res.status(200).json({"message" : "Objet ajouté à la collection"});
            });
        }
    }
    exports.deleteItem = (req, res, next) => {
        if (req.params.itemID == null) {
            return res.json({"message" : "Aucun objet n'a été choisi"});
        }
        else {
            conn.query("SELECT * from objet where idObjet  = ?", [req.params.itemID], (err, result)=> {
                if (result.length > 0) {
                    if (result[0].status == null) {
                        conn.query("DELETE from objet where idObjet = ?", [req.params.itemID], (err, result) => {
                            return res.json({"message" : "objet supprimé des ventes"});
                        });
                    }
                }
                else {
                    return  res.json({"message" : "le produit n'existe pas"});
                }
            });
        }
    }
