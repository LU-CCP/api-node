const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const agregar = async body => {
  const { id_cita, descripcion } = body;

  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id_cita", id_cita)
    .input("descripcion", descripcion)
    .query("INSERT INTO diagnostico VALUES(@id_cita, @descripcion)");

  connect.close();

  return results;
};

const editar = async (id, body) => {
  const { id_cita, descripcion } = body;

  const connect = await sql.connect(sqlConfig.config);
  const editar = await connect
    .request()
    .input("id", id)
    .input("id_cita", id_cita)
    .input("descripcion", descripcion)
    .query(
      "UPDATE diagnostico SET id_cita = @id_cita, descripcion = @descripcion WHERE diagnostico.id = @id"
    );

  connect.close();

  return editar;
};

const eliminar = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const eliminar = await connect
    .request()
    .input("id", id)
    .query("DELETE FROM diagnostico WHERE diagnostico.id = @id");

  connect.close();

  return eliminar;
};

const encontrarIdCita = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id", id)
    .query("SELECT c.id FROM cita c WHERE c.id = @id");

  connect.close();

  return results.recordset[0].length != 0;
};

const encontrarIdDiagnostico = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id", id)
    .query("SELECT d.id FROM diagnostico d WHERE d.id = @id");

  connect.close();

  console.log(results);

  return results.recordset[0].length != 0;
};

module.exports = {
  agregar,
  editar,
  eliminar,
  encontrarIdCita,
  encontrarIdDiagnostico
};
