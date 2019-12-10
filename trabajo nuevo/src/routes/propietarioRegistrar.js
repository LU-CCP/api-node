const express = require("express");
const router = express.Router(); //
const sql = require("mssql");
const dbConfig = require("./mssqlConfig");

router.post("/", function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();
    sqlRequest.query("SELECT * FROM persona", function(err, data) {
      if (err) console.log(err);

      res.send(data);

      sql.close();
    });
  });
});

module.exports = router;
