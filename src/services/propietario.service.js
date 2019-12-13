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
    if (result.recordsets[0].length == 0) {
      //SI NO HAY PERSONAS REGISTRADAS ENTONCES DEVUELVE QUE SI SE PUEDE GUARDAR
      return true;
    } else {
      //SI HAY PERSONAS REGISTRADAS CON ESE RUT DEVUELVE QUE NO SE PUEDE GUARDAR
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const guardarUsuario = async (
  rut,
  nombre,
  apellido_materno,
  apellido_paterno,
  telefono
) => {
  const comando1 =
    "INSERT INTO Persona VALUES(@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)";
  if ((await consultarUsuarioGuardado(rut)) == true) {
    try {
      let conn = await sql.connect(sqlConfig.config);
      await conn
        .request()
        .input("rut", rut)
        .input("nombre", nombre)
        .input("apellido_materno", apellido_materno)
        .input("apellido_paterno", apellido_paterno)
        .input("telefono", telefono)
        .query(comando1);
      sql.close();

      const answer = true;
      return answer;
    } catch (error) {
      console.log(error);
    }
  } else {
    const answer = false;
    return answer;
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
    console.log("Length", result.recordsets[0].length);
    if (result.recordsets[0].length == 0) {
      //SI NO HAY UN MEDICO REGISTRADO CON ESA ID ENTONCES LO GUARDA
      return true;
    } else {
      //SI HAY UN MEDICO REGISTRADO CON ESA ID ENTONCES NO LO GUARDA
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
  devolverIdPersona,
  guardarUsuario
};
