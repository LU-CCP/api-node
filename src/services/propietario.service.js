const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

async function existsPropietarioId(req) {
  try {
    const { id } = req;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", id)
      .query("SELECT * FROM Persona WHERE id=@id");

    sql.close();
    if (result.rowsAffected == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function savePropietario(body) {
  try {
    const { rut, nombre, apellido_materno, apellido_paterno, telefono } = body;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("rut", rut)
      .input("nombre", nombre)
      .input("apellido_materno", apellido_materno)
      .input("apellido_paterno", apellido_paterno)
      .input("telefono", telefono)
      .query(
        "insert into Persona VALUES (@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)"
      );
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deletePropietario(req) {
  try {
    const { id } = req;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", id)
      .query("DELETE FROM Persona WHERE Persona.id=@id");
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editPropietario(req) {
  try {
    const {
      rut,
      nombre,
      apellido_materno,
      apellido_paterno,
      telefono
    } = req.body;
    const { id } = req.params;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", id)
      .input("rut", rut)
      .input("nombre", nombre)
      .input("apellido_materno", apellido_materno)
      .input("apellido_paterno", apellido_paterno)
      .input("telefono", telefono)
      .query(
        `UPDATE Persona SET rut=@rut, nombre=@nombre, apellido_materno=@apellido_materno, apellido_paterno=@apellido_paterno, telefono=@telefono WHERE Persona.id='${id}'`
      );
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function showPropietario(req) {
  try {
    const { id } = req;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", id)
      .query("SELECT * FROM Persona WHERE Persona.id=@id");
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function filterPropietario(req) {
  try {
    const { nombre } = req;
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("nombre", nombre)
      .query("SELECT * FROM Persona WHERE upper(Persona.nombre)=@nombre");
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  savePropietario,
  editPropietario,
  deletePropietario,
  showPropietario,
  filterPropietario,
  existsPropietarioId
};
