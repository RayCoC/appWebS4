require("dotenv").config();
var conn = require("../config/database");

    exports.addItem = (req, res, next) => {
    const {name,price,image,desc,stock, type, userId, collectionId} = req.body;

    if (name == null || price == null || image == null || desc == null || stock == null || type == null || userId == null) {
        return res.status(400).json({"message" : "Un champ est manquant"});
    }
    else if (! isNaN(price)) {
        return res.status(400).json({"message" : "Le prix doit être un nombre !"});
    }
    conn.query("SELECT * from utilisateur natural join objet where idUtilisateur = ? and nomObjet = ?", [userId, name], (err, resultat) => {
        if (resultat.length > 0) {
            return res.status(400).json({"message" : "Vous savez déjà publié cet article en ligne"});
        }
        else {
            conn.query(`insert into objet (nomObjet,prix,image, description,stock, typeObjet,idUtilisateur, idCollection) values ("${name}","${price}","${image}","${desc}","${stock}","${type}","${userId}","${collectionId}");`, (err, result) => {
                return res.status(200).json({"message" : "Inscription effectué !"});
            });
        }
    });
    }

