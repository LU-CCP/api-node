const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const consultarUsuarioGuardado = async id => {
  try {
    const conn = await sql.connect(sqlConfig.config);
    const result = await conn
      .request()
      .input("rut", id)
      .query("SELECT p.rut FROM Persona p WHERE p.rut=@rut");
    console.log(result.recordsets[0].length);
    if (result.recordsets[0].length == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const consultarMedicoRegistrado = async id => {
  try {
    const conn = await sql.connect(sqlConfig.config);
    const result = await conn
      .request()
      .input("rut", id)
      .query(
        "SELECT p.id, mv.id_persona FROM Persona p, medico_veterinario mv WHERE p.id=mv.id AND p.rut=@rut"
      );
    if (result.recordsets[0].length == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const devolverIdPersona = async id => {
  try {
    const conn = await sql.connect(sqlConfig.config);
    const result = await conn
      .request()
      .input("rut", id)
      .query("SELECT p.id FROM Persona p WHERE p.rut=@rut");
    if (result.recordsets[0].length == 0) {
      return false;
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  consultarUsuarioGuardado,
  consultarMedicoRegistrado,
  devolverIdPersona
};
