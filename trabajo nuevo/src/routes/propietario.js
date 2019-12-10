const express = require("express");
const router = express.Router(); //
const sql = require("mssql");
const dbConfig = require("./mssqlConfig");

router.get("/", function(req, res) {
  //   res.send("ruta get propietario");}
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();
    sqlRequest.query("SELECT * FROM persona", function(err, data) {
      if (err) console.log(err);

      res.send(data);

      sql.close();
    });
  });
});

router.post("/agregar", function(request, response) {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  } = request.body;
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    const query = `INSERT INTO persona VALUES ('${rut}', '${nombre}', '${apellido_materno}', '${apellido_paterno}', '${telefono}')`;

    sqlRequest.query(query, function(err, data) {
      if (err) console.log(err);
      response.send("Agregado correctamente");
      console.log(data);
      sql.close();
    });
  });
});

module.exports = router;
