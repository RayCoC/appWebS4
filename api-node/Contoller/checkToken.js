require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
    else {
        return res.status(401);
    }
};