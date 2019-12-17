require('dotenv').config();
const { DB_URI, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_ENCRYPT } = process.env;

const dbConfig = {
<<<<<<< HEAD
  user: "magister",
  password: "A7r9bFRTBtyXot7IPxin",
  server: "magisterdereemplazo.database.windows.net",
  database: "magisterdereemplazo",
  port: 1433,
  options: {
    encrypt: true
  }
};
=======
    user: DB_USER,
    password: DB_PASS,
    server: DB_URI,
    database: DB_NAME,
    port: parseInt(DB_PORT),
    options:
    {
        encrypt: true
    }
}
>>>>>>> master

exports.config = dbConfig;
