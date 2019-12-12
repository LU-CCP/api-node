const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd
const deletePaciente = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn
      .request()
      .input("idpaciente", sql.Int, id)
      .query("DELETE from paciente where id = @idpaciente");

    sql.close();

    res.send("se borro");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { deletePaciente };
