require("dotenv").config();
const { DB_URI, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_ENCRYPT } = process.env;

const dbConfig = {
  user: DB_USER,
  password: DB_PASS,
  server: DB_URI,
  database: DB_NAME,
  port: parseInt(DB_PORT),
  options: {
    encrypt: true
  }
};

exports.config = dbConfig;
