const mysql = require('mysql');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
};

const conn = mysql.createPool(config);

module.exports = conn;