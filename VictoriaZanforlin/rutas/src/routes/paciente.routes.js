const express = require("express");
const sql = require("mssql");

const router = express.Router(); // para la definicion de nuevas rutas
const sqlConfig = require("../mssqlConfig");

// en app.js app.use("/propietario", propietarioRoutes);

// router.get("/", function(require, response) {
//   response.send("ruta get paciente");
// });

router.get("/", function(require, response) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query(
      "select * from paciente left join Persona on (paciente.id_propietario=Persona.id) ",
      function(error, data) {
        if (error) console.log(error);

        response.send(data);

        sql.close();
      }
    );
  });
});

module.exports = router;
