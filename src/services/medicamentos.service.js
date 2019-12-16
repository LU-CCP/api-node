const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

async function getMedicamento(id) {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", sql.Int, id)
      .query("select * from medicamento where id = @id");

    sql.close();

    return result.recordset[0];
  } catch (error) {
    console.log(error);
  } finally {
    await sql.close();
  }
}

async function insertMedicamento(body) {
  const { nombre, dosis, unidad_medida } = body;
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("dosis", sql.Int, dosis)
      .input("unidad_medida", sql.VarChar, unidad_medida)
      .query(
        "insert into medicamento(nombre, dosis, unidad_medida) values(@nombre,@dosis,@unidad_medida)"
      );

    await sql.close();
    return result;
    //res.send(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sql.close();
  }
}

async function deleteMedicamento(id) {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", sql.Int, id)
      .query("delete from medicamento where id= @id");

    sql.close();

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await sql.close();
  }
}

module.exports = {
  getMedicamento,
  insertMedicamento,
  deleteMedicamento
};
