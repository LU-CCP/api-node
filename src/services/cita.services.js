const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const getCita = async (req, res) => {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query("select * from persona");

    sql.close();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const checkCita = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM cita WHERE id = @id");

    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  }
};

const getConsultaCita = async params => {
  const { fecha, medico, propietario } = params;
  let conn = await sql.connect(sqlConfig.config);
  try {
    if (fecha == "" && medico == "" && propietario == "") {
      let result = await conn.request().query("SELECT * FROM cita");
    } else {
      let result = await conn
        .request()
        .input("fecha", fecha)
        .input("medico", medico)
        .input("propietario", propietario)
        .query(
          "SELECT * FROM cita where (@fecha is null or @fecha = cast (cita.fecha as date) and (@medico is null or @medico = id_medico) and (@propietario is null or @propietario = id_propietario))"
        );
    }
    sql.close();

    if (result.rowsAffected > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const checkMedico = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM medico_veterinario WHERE id = @id");

    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  } finally {
    sql.close();
  }
};

const checkPaciente = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM paciente WHERE id = @id");

    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  } finally {
    sql.close();
  }
};

const citaValida = async body => {
  let valido;
  let = { fecha, id_medico, motivo_consulta, id_paciente, monto } = body;

  if ((await checkMedico(id_medico)) && (await checkPaciente(id_paciente))) {
    valido = true;
  } else {
    valido = false;
  }
  console.log(valido);

  return valido;
};

const putCita = async (body, params) => {
  const { fecha, id_paciente, motivo_consulta, id_medico, monto } = body;
  const { id } = params;
  const sqlRequest = new sql.Request();

  sqlRequest.input("fecha", fecha);
  sqlRequest.input("id_paciente", id_paciente);
  sqlRequest.input("motivo_consulta", motivo_consulta);
  sqlRequest.input("id_medico", id_medico);
  sqlRequest.input("monto", monto);

  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query(
      `update cita set fecha = '${fecha}', id_paciente = '${id_paciente}', motivo_consulta = '${motivo_consulta}', id_medico =  '${id_medico}', monto =  ${monto} 
      where id = '${Object.values(id)[0]}'`
    );
    sql.close();
  } catch (error) {
    console.log(error);
  }
};

const postCita = async body => {
  const { fecha, id_paciente, motivo_consulta, id_medico, monto } = body;
  const sqlRequest = new sql.Request();

  sqlRequest.input("fecha", fecha);
  sqlRequest.input("id_paciente", id_paciente);
  sqlRequest.input("motivo_consulta", motivo_consulta);
  sqlRequest.input("id_medico", id_medico);
  sqlRequest.input("monto", monto);

  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query(
      `INSERT INTO cita (fecha, id_paciente, motivo_consulta, id_medico, monto)
        VALUES ('${fecha}', '${id_paciente}', '${motivo_consulta}', '${id_medico}', ${monto}) `
    );
  } catch (error) {
    console.log(error);
  } finally {
    sql.close();
  }
};

const deleteCita = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result1 = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("DELETE FROM diagnostico WHERE id_cita = @id");
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("DELETE FROM cita WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getCita,
  checkCita,
  putCita,
  postCita,
  deleteCita,
  citaValida,
  getConsultaCita
};
