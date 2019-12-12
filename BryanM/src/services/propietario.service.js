const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

const getPropietario = async id => {
  //obtiene un propietario de la base de datos
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .query(`SELECT p.id  FROM Persona p WHERE p.id = ${id}`);

    if (result.recordsets[0].length == 0) {
      console.log("Propietario encontrado");
      return false;
    } else {
      console.log("Propietario no encontrado");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

const setPropietario = async (
  rut,
  nombre,
  apellido_materno,
  apellido_paterno,
  telefono
) => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    const sqlRequest = new sql.Request();
    sqlRequest.input("rut", rut);
    sqlRequest.input("nombre", nombre);
    sqlRequest.input("apellido_materno", apellido_materno);
    sqlRequest.input("apellido_paterno", apellido_paterno);
    sqlRequest.input("telefono", telefono);

    let result = await conn
      .request()
      .query(
        "INSERT INTO persona VALUES (@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)"
      );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getPropietario,
  setPropietario
};
