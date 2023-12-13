// db.js
const mysql = require('mysql2/promise');

const dbConfig = {
  // Replace YOUR_INSTANCE_CONNECTION_NAME with your Google Cloud SQL instance connection name
  host: '/cloudsql/final-project-ch2-ps034:asia-southeast2:survey',
  user: 'root',
  password: 'survey',
  database: 'new',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
