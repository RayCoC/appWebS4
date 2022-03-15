require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.body.token || req.header('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
            if (err) {
                return res.json({"message" : "token err"});
            }
            return next();
        });
    }
    else {
        return res.json({"message" : "token pb"});
    }
};