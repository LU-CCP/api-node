const express = require("express");
const sql = require("mssql");
const sqlConfig = require("./mssqlConfig.js");

const router = express.Router();

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query("select * from Persona", function(error, data) {
      if (error) consola.log(error);

      res.send(data);

      sql.close();
    });
  });
});

module.exports = router;
