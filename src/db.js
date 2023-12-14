

// db.js
const mysql = require('mysql2/promise');

// Replace the following database connection details with your actual database configuration
const dbConfig = {
  host: '34.101.123.175',
  user: 'root',
  password: 'survey',
  database: 'survey',
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
