const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const router = express.Router();

//Crear una ruta que permita registrar un propietario

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query("select * from persona", function(error, data) {
      if (error) console.log(error);

      res.send(data);

      sql.close();
    });
  });
});

router.post("/add", function(req, res) {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  } = req.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();
    sqlRequest.input("rut", rut);
    sqlRequest.input("nombre", nombre);
    sqlRequest.input("apellido_materno", apellido_materno);
    sqlRequest.input("apellido_paterno", apellido_paterno);
    sqlRequest.input("telefono", telefono);
    sqlRequest.query(
      "INSERT INTO Persona VALUES(@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)",
      function(error, data) {
        if (error) console.log(error);

        res.send(data);
        sql.close();
      }
    );
  });
});

module.exports = router;
