require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.body.token || req.headers('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
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