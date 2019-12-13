const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

// Obtener listado de pacientes, filtrando por sus propiedades principales
// Obtener los datos de un paciente dado su id

async function obtenerPacientesParams(id_cita) {
  try {
    const conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id_cita", sql.Int, id_cita)
      .query("select * from diagnostico where id_cita=@id_cita");
    sql.close();
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function obtenerPacientesId(id) {
  try {
    const conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.Int, id)
      .query("select * from diagnostico where id=@id");
    sql.close();
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { obtenerPacientesParams, obtenerPacientesId };
