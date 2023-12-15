// db.js
const mysql = require('mysql2/promise');

// Replace the following database connection details with your actual database configuration
const dbConfig = {
  host: '34.101.123.175',
  user: 'root',
  password: 'survey',
  database: 'new',
};

const pool = mysql.createPool(dbConfig);

module.exports = {
  execute: async (...args) => {
    const conn = await pool.getConnection();
    try {
      return await conn.execute(...args);
    } finally {
      conn.release();
    }
  },
  
  // Add other methods or properties you may need here
};
