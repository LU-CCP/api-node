const express = require("express");
const sql = require("mssql");

const router = express.Router();
const sqlConfig = require("../mssqlConfig");

// crear una ruta que permita el registro de las citas
//previo a hacer el registro se debe vzlidar q existan los registros de idPaciente y idPersona asociados

router.post("/ingresar", function(require, response) {
  const {
    fecha,
    id_paciente,
    motivo_consulta,
    id_medico,
    monto
  } = require.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.input("fecha", fecha);
    sqlRequest.input("id_paciente", id_paciente);
    sqlRequest.input("motivo_consulta", motivo_consulta);
    sqlRequest.input("id_medico", id_medico);
    sqlRequest.input("monto", monto);

    sqlRequest.query(
      " IF EXISTS (SELECT * FROM medico_veterinario, paciente  WHERE paciente.id = @id_paciente AND  medico_veterinario.id=@id_medico) BEGIN INSERT INTO cita VALUES (@fecha, @id_paciente, @motivo_consulta, @id_medico, @monto) END",
      function(error, data) {
        if (error || data.rowsAffected.length == 0) {
          response.statusCode = 400;
          response.send(error);
          return;
        }
        response.send("Cita agendada correctamente");

        sql.close();
      }
    );
  });
});

module.exports = router;
