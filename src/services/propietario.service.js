const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

async function getCita(id) {
  //await
  //obtiene propietario de bd

  let conn = await sql.connect(sqlConfig.config);

  let result = await conn
    .request()
    .query(
      `INSERT INTO cita (fecha, id_paciente, motivo_consulta, id_medico, monto) VALUES ('${fecha}','${idPaciente}','${motivoConsulta}','${idMedico}','${monto}'`
    );

  sql.close();

  res.send(result);
}

module.exports = getCita;
