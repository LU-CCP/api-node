const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd
const ingresoPaciente = async body => {
  try {
    const {
      nombre,
      raza,
      especie,
      id_propietario,
      sexo,
      fecha_nacimiento
    } = body;

    let connection = await sql.connect(sqlConfig.config);

    let ingreso = await connection
      .request()

      .input("nombre", sql.VarChar, nombre)
      .input("raza", sql.VarChar, raza)
      .input("especie", sql.VarChar, especie)
      .input("id_propietario", sql.Int, id_propietario)
      .input("sexo", sql.Int, sexo)
      .input("fecha_nacimiento", fecha_nacimiento)

      .query(
        `INSERT INTO paciente VALUES (@nombre, @raza, @especie, @id_propietario, @sexo, @fecha_nacimiento)`
      );

    sql.close();
    return "Ingreso Exitoso!";
  } catch (error) {
    console.log(error);
  }
};

const getPropietario = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id_propietario", id)
      .query(`SELECT * FROM persona WHERE id = @id_propietario`);
    sql.close();
    return result.rowsAffected;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { ingresoPaciente, getPropietario };
