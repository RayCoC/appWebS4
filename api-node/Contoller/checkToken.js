require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
            if (err) {
                return res.status(403).json({"message" : "token pb"});
            }
            next();
        });
    }
    else {
        return res.status(401).json({"message" : "token pb"});
    }
};