const express = require("express");
const sql = require("mssql");
const { config } = require("../mssqlConfig");

//Interactuando con la bd

const getPacientes = async (propiedad, busqueda) => {
  try {
    const signo = "%";
    let conn = await sql.connect(config);
    let result = await conn
      .request()
      .query(
        `SELECT * FROM paciente WHERE ${propiedad} like'${busqueda}${signo}'`
      );
    sql.close();
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

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

    let connection = await sql.connect(config);

    let ingreso = await connection
      .request()

      .input("nombre", sql.VarChar, nombre)
      .input("raza", sql.VarChar, raza)
      .input("especie", sql.VarChar, especie)
      .input("id_propietario", sql.Int, id_propietario)
      .input("sexo", sexo)
      .input("fecha_nacimiento", fecha_nacimiento)

      .query(
        "INSERT INTO paciente VALUES (@nombre, @raza, @especie, @id_propietario, @sexo, @fecha_nacimiento)"
      );

    sql.close();
    return "Ingreso Exitoso!";
  } catch (error) {
    console.log(error);
  }
};

const updatePaciente = async (id, body) => {
  try {
    const {
      nombre,
      raza,
      especie,
      id_propietario,
      sexo,
      fecha_nacimiento
    } = body;

    let conn = await sql.connect(config);
    let result = await conn
      .request()
      .input("id", id)
      .input("nombre", nombre)
      .input("raza", raza)
      .input("especie", especie)
      .input("id_propietario", id_propietario)
      .input("sexo", sexo)
      .input("fecha_nacimiento", fecha_nacimiento)
      .query(
        `UPDATE paciente 
        SET 
          nombre = @nombre,
          raza = @raza, 
          especie = @especie, 
          id_propietario = @id_propietario, 
          sexo = @sexo, 
          fecha_nacimiento = @fecha_nacimiento 
        WHERE id = @id`
      );
    sql.close();
    return { message: "Paciente updated successfully" };
  } catch (e) {
    console.log(e);
  }
};

const deletePaciente = async id => {
  try {
    let conn = await sql.connect(config);
    let result = await conn
      .request()
      .input("id", id)
      .query(`DELETE FROM paciente WHERE id = @id`);
    sql.close();
    return { message: "Paciente deleted successfully" };
  } catch (e) {
    console.log(e);
  }
};

const getPropietario = async id => {
  try {
    let conn = await sql.connect(config);
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

const getPaciente = async id => {
  try {
    let conn = await sql.connect(config);
    let result = await conn
      .request()
      .input("id", id)
      .query(`SELECT * FROM paciente WHERE id = @id`);
    sql.close();
    return result.rowsAffected;
  } catch (e) {
    console.log(e);
  }
};

async function obtener_paciente(id) {
  try {
    let conn = await sql.connect(config);
    let result = await conn
      .request()
      .input("id", id)
      .query("select * from paciente where paciente.id = @id");
    if (result.recordset.length == 0) return 404;
    else return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  obtener_paciente,
  ingresoPaciente,
  updatePaciente,
  deletePaciente,
  getPropietario,
  getPacientes,
  getPaciente
};
