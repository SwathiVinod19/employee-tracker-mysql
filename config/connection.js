//import msql for connection
const mysql = require("mysql2");

//require dotenv for protecting password
require('dotenv').config();

// console.log(process.env);

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    database: 'employees_db', 
    password: process.env.DB_PASSWORD 
  },
  console.log(`Connected to the database!!`)
);

module.exports = db;