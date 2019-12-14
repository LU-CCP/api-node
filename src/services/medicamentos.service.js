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
    console.log("resultado del get: ", result.recordset[0]);
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

async function getMedicamentoPorNombre(nombre) {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("nombre", sql.VarChar, nombre)
      .query("select * from medicamento m where m.nombre = @nombre");

    sql.close();
    console.log("resultado del get: ", result.recordset[0]);
    return result.recordset[0];
  } catch (error) {
    console.log(error);
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
  }
}

async function deleteMedicamento(id) {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .query(`delete from medicamento where id=${id}`);

    sql.close();

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function updateMedicamento(body) {
  const { id, nombre, dosis, unidad_medida } = body;
  console.log(body);
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .input("dosis", sql.Int, dosis)
      .input("unidad_medida", sql.VarChar, unidad_medida)
      .query(
        "UPDATE medicamento SET nombre = @nombre, dosis=@dosis, unidad_medida=@unidad_medida WHERE id = @id"
      );

    await sql.close();
    return result;
    //res.send(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMedicamento,
  insertMedicamento,
  deleteMedicamento,
  updateMedicamento,
  getMedicamentoPorNombre
};
