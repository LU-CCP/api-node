const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

async function conectar() {
  try {
    const conecction = await sql.connect(sqlConfig.config);
    return conecction;
  } catch (error) {
    console.log("se produjo un error en la conexion");
  }
}

async function compruebaPropietario(req) {
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

async function listaPropietario(res, req) {
  try {
    const conecction = await conectar();
    let data = await conecction.query("SELECT * FROM Persona");
    sql.close();
    return data;
  } catch (error) {
    console.log("se produjo un error");
  }
}

async function agregaPropietario(body) {
  try {
    const { rut, nombre, apellido_materno, apellido_paterno, telefono } = body;
    let conn = await conectar();

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

async function borraPropietario(req) {
  try {
    const { id } = req;
    let conecction = await conectar();

    let result = await conecction
      .request()
      .input("id", id)
      .query("DELETE FROM Persona WHERE Persona.id=@id");
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function actualizaPropietario(req) {
  try {
    const {
      rut,
      nombre,
      apellido_materno,
      apellido_paterno,
      telefono
    } = req.body;
    const { id } = req.params;
    let conecction = await conectar();

    let result = await conecction
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

async function buscaPorId(req) {
  try {
    const { id } = req;
    let conecction = await conectar();

    let result = await conecction
      .request()
      .input("id", id)
      .query("SELECT * FROM Persona WHERE Persona.id=@id");
    sql.close();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function fitraPorNombre(req) {
  try {
    const { nombre } = req;
    let conecction = await conectar();

    let result = await conecction
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
  listaPropietario,
  agregaPropietario,
  borraPropietario,
  actualizaPropietario,
  buscaPorId,
  fitraPorNombre,
  compruebaPropietario
};
