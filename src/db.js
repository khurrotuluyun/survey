
const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'capstone',
};

const connection = mysql.createConnection(dbConfig);

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const closeDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    connection.end(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};



module.exports = {
  connectToDatabase,
  queryDatabase,
  closeDatabaseConnection,
};
