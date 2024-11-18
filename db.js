// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',  // Replace with your database host
  user: 'root',       // Replace with your database user
  password: '',       // Replace with your database password
  database: 'ws_db',  // Replace with your database name
});

module.exports = pool.promise();
