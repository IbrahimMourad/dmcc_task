const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  password: '1234',
  user: 'root',
  database: 'db',
  host: 'localhost',
  port: '3306',
});

let user = {};

user.createT = () => {
  return new Promise((resolve, reject) => {
    const sql =
      'CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))';

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = user;
