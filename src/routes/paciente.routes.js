const express = require("express");
const router = express.Router();
const dbConfig = require("../mssqlConfig");
const sql = require("mssql");

router.get("/", function(req, res) {
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();
    sqlRequest.query("select * from paciente", function(error, data) {
      if (error) console.log(error);
      res.send(data);
      sql.close();
    });
  });
});

module.exports = router;
