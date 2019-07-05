var mysql = require('mysql');

var connection = mysql.createPool({
    user: 'root',
    password: 'mohit1930',
    database: 'labour_log'
});

module.exports = connection;