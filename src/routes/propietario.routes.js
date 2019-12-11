const express = require("express");
const sql = require("mssql");
const router = express.Router();
const dbConfig = require("../mssqlConfig");
const server = express();
server.use(express.json());

router.post("/agregar", function(req, res) {
  console.log(req.params);
  console.log(req.body);
  const body = req.body;
  const { rut, nombre, apellido_materno, apellido_paterno, telefono } = body;
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();
    sqlRequest.query(
      `INSERT INTO Persona values('${rut}', '${nombre}', '${apellido_materno}', '${apellido_paterno}', '${telefono}')`,
      function(error, data) {
        if (error) console.log(error);
        res.send("f");
        sql.close();
      }
    );
  });
});

module.exports = router;

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query("select * from Persona", function(error, data) {
      if (error) console.log(error);

      res.send(data);

      sql.close();
    });
  });
});

module.exports = router;
