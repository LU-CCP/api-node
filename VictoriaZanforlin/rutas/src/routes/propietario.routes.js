const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const router = express.Router(); // para la definicion de nuevas rutas

// en app.js app.use("/propietario", propietarioRoutes);

router.get("/", function(request, response) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err); // realmente deberia mostrar el error ej 500

    const sqlRequest = new sql.Request(); // el new reserva memoria para un objeto

    sqlRequest.query("select * from Persona", function(error, data) {
      if (error) console.log(error);

      response.send(data);

      sql.close();
    });
  });
  //   response.send("ruta get propietario");
});

router.post("/ingreso", function(request, response) {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  } = request.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query(
      `insert into Persona (rut,nombre,apellido_materno, apellido_paterno, telefono) VALUES ('${rut}', '${nombre}', '${apellido_paterno}', '${apellido_materno}', '${telefono}')`,
      function(error, data) {
        // const query =
        //   'insert into Persona (rut,nombre,apellido_materno, apellido_paterno, telefono) VALUES ("' +
        //   rut +
        //   '", "' +
        //   nombre +
        //   '", "' +
        //   apellido_paterno +
        //   '", "' +
        //   apellido_materno +
        //   '", "' +
        //   telefono +
        //   '")';

        // console.log(query);
        // sqlRequest.query(query, function(error, data) {
        if (error) console.log(error);

        response.send("Se guardo la persona");

        sql.close();
      }
    );
  });
});

module.exports = router;
