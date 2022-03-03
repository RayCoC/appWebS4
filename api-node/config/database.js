const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-commerce',
};

const conn = mysql.createPool(config);

module.exports = conn;