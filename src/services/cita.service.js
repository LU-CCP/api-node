// const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

// //Interactuando con la bd
// const checkMedico = async id => {
//   try {
//     let conn = await sql.connect(sqlConfig.config);
//     let result = await conn
//       .request()
//       .input("id", sql.BigInt, id)
//       .query("SELECT * FROM paciente WHERE ");
//   }
// };

const postCita = async body => {
  //await
  //obtiene propietario de bd
  let { fecha, idPaciente, motivoConsulta, idMedico, monto } = body;

  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .query(
        `INSERT INTO cita (fecha, id_paciente, motivo_consulta, id_medico, monto) VALUES ('${fecha}','${idPaciente}','${motivoConsulta}','${idMedico}','${monto}')`
      );
    sql.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postCita };
