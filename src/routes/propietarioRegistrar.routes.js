const express = require("express");
const sql = require("mssql");
const router = express.Router();
const dbConfig = require("../mssqlConfig");
const server = express();
server.use(express.json());

router.post("/", function(req, res) {
  console.log(req.body);

  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  } = req.body;
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();
    sqlRequest.query(
      `INSERT INTO Persona values('${rut}', '${nombre}', '${apellido_materno}', '${apellido_paterno}', '${telefono}')`,
      function(error, data) {
        if (error) console.log(error);
        res.send("IMPLEMENTADO CON EXITO");
        sql.close();
      }
    );
  });
});

module.exports = router;
