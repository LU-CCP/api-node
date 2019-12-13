const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const existeCita = () => {};

`IF EXISTS (SELECT id FROM cita WHERE id = 3)
UPDATE cita set cita.fecha= cita.fecha`;

const getCita = async (req, res) => {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query("select * from persona");

    sql.close();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const checkCita = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM cita WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  }
};

const checkMedico = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM medico_veterinario WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  }
};

const checkPaciente = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM paciente WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  }
};

const citaValida = (id_medico, id_paciente) => {
  return checkMedico(id_medico) && checkPaciente(id_paciente);
};

const putCita = async (body, params) => {
  const { fecha, id_paciente, motivo_consulta, id_medico, monto } = body;
  const { id } = params;
  const sqlRequest = new sql.Request();

  sqlRequest.input("fecha", fecha);
  sqlRequest.input("id_paciente", id_paciente);
  sqlRequest.input("motivo_consulta", motivo_consulta);
  sqlRequest.input("id_medico", id_medico);
  sqlRequest.input("monto", monto);

  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query(
      `update cita set fecha = '${fecha}', id_paciente = '${id_paciente}', motivo_consulta = '${motivo_consulta}', id_medico =  '${id_medico}', monto =  ${monto} 
      where id = '${Object.values(id)[0]}'`
    );
    sql.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCita, checkCita, putCita };
