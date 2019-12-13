const dbConfig = {
  user: "leo", //'magister',
  password: "r2d2lapf95", // 'A7r9bFRTBtyXot7IPxin',
  server: "CL-LAGASHU6/LEO_SERVER", //'magisterdereemplazo.database.windows.net',
  database: "magisterdereemplazo",
  port: 3001, //1433,
  options: {
    encrypt: true
  }
};

exports.config = dbConfig;
