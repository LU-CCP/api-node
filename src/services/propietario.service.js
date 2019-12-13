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

const setMedico = async (id_persona, fecha_graduacion) => {
  const conn = await sql.connect(sqlConfig.config);

  await conn
    .request()
    .input("id_persona", id_persona)
    .input("fecha_graduacion", fecha_graduacion)
    .query(
      "INSERT INTO medico_veterinario VALUES (@id_persona, @fecha_graduacion)"
    );
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

module.exports = {
  savePropietario,
  editPropietario,
  deletePropietario,
  showPropietario,
  filterPropietario,
  existsPropietarioId
};
