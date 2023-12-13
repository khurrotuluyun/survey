// db.js
const mysql = require('mysql2/promise');


// Replace the following database connection details with your actual database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'new',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
