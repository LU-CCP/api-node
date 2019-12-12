// const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

async function postCita(data) {
  //await
  //obtiene propietario de bd
  let { fecha, idPaciente, motivoConsulta, idMedico, monto } = req.body;

    let connection = await sql.connect(sqlConfig.config);

    let data = await connection.query(
        `INSERT INTO cita (fecha, id_paciente, motivo_consulta, id_medico, monto) VALUES ('${fecha}','${idPaciente}','${motivoConsulta}','${idMedico}',${monto})`
      );
  });
}

module.exports = {postCita}