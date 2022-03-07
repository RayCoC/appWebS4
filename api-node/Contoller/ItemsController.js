require("dotenv").config();
var conn = require("../config/database");
    exports.addItem = (req, res, next) => {
            var name = req.body.name;
            var price = req.body.price;
            var desc = req.body.desc;
            var image = req.file.filename;
            var stock = req.body.stock;
            var type = req.body.type;
            var collectionId = req.body.collectionId;

            if (name == null || price == null || image == null || desc == null || stock == null || type == null) {
                return res.status(400).json({"message" : "Un champ est manquant"});
            }
            else if (! /^-?\d+$/.test(price)) {
                return res.status(400).json({"message" : "Le prix doit être un nombre !"});
            }
            conn.query("SELECT * from utilisateur natural join objet where idUtilisateur = ? and nomObjet = ?", [req.session.userID, name], (err, resultat) => {
                if (resultat.length > 0) {
                    return res.status(400).json({"message" : "Vous savez déjà publié cet article en ligne"});
                }
                else {
                    conn.query(`insert into objet (idUtilisateur,nomObjet,prix,image, description,stock, typeObjet,idCollection) values ("${req.session.userID}","${name}","${price}","${image}","${desc}","${stock}","${type}","${collectionId}");`, (err, result) => {
                        return res.status(200).json({"message" : "objet ajouté !"});
                    });
                }
            });
    }
    exports.itemsOfAnUser = (req,res,next) => {
        conn.query("SELECT * from objet where idUtilisateur = ?", [req.session.userID], (err, resultat) => {
            if (resultat.length > 0) {
                return res.status(200).json({"userID" : req.params.id, "data" : resultat});
            }
            else {
                throw err;
            }
        });
    }
