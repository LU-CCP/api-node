const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

//Verifica si el propietario existe o no en la base de datos
const verifPropietario = async rut => {
  try {
    const conn = await sql.connect(sqlConfig.config);

    const result = await conn
      .request()
      .input("rut", rut)
      .query("SELECT p.rut FROM Persona p WHERE p.rut = @rut");

    if (result.recordsets[0].length > 0) {
      console.log("Propietario encontrado");
      return true;
    } else {
      console.log("Propietario no encontrado");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

//Inserta un propietario
const setPropietario = async (
  rut,
  nombre,
  apellido_materno,
  apellido_paterno,
  telefono
) => {
  try {
    let conn = await sql.connect(sqlConfig.config);

    await conn
      .request()
      .input("rut", rut)
      .input("nombre", nombre)
      .input("apellido_materno", apellido_materno)
      .input("apellido_paterno", apellido_paterno)
      .input("telefono", telefono)
      .query(
        "INSERT INTO persona VALUES(@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)"
      );
  } catch (err) {
    console.log(err);
  }
};

const getIdPersona = async rut => {
  const conn = await sql.connect(sqlConfig.config);

  const result = await conn
    .request()
    .input("rut", rut)
    .query("SELECT id FROM persona WHERE rut = @rut");

  return result;
};

//Verifica si el propietario a ingresar es medico o no
const verifMedico = async rut => {
  try {
    const conn = await sql.connect(sqlConfig.connect);

    const result = await conn
      .request()
      .input("rut", rut)
      .query(
        "SELECT p.id, mv.id FROM persona p JOIN medico_veterinario mv ON(p.id = mv.id_persona) WHERE p.rut = @rut"
      );

    if (result.recordsets[0].length > 0) {
      console.log("Es medico");
      return true;
    } else {
      console.log("No es medico");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const setMedico = async (id_persona, fecha_graduacion) => {
  const conn = await sql.connect(sqlConfig.config);

  await conn
    .request()
    .input("id_persona", id_persona)
    .input("fecha_graduacion", fecha_graduacion)
    .query(
      "INSERT INTO medico_veterinario VALUES (@idPersona, @fecha_graduacion)"
    );
};

module.exports = {
  verifPropietario,
  verifMedico,
  setPropietario,
  setMedico,
  getIdPersona
};
