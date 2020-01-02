const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

async function conectar() {
  try {
    const conecction = await sql.connect(sqlConfig.config);
    return conecction;
  } catch (error) {
    console.log("se produjo un error en la conexion");
    console.log(error);
  }
}

async function addPaciente(body) {
  try {
    const { nombre, raza, especie, id_propietario } = body;
    let conecction = await conectar();
    let resultado = await conecction

      .request()
      .input("nombre", nombre)
      .input("raza", raza)
      .input("especie", especie)
      .input("id_propietario", id_propietario)
      .query(
        "insert into Paciente values (@nombre,@raza,@especie,@id_propietario)"
      );
    sql.close();
    return resultado;
  } catch (error) {
    console.log(error);
    console.log("error al agregar paciente!");
  }
}

async function deletePaciente(paciente) {
  try {
    const { id } = paciente;
    let conecction = await conectar();
    let resultado = await conecction

      .request()
      .input("id", id)
      .query("DELETE FROM Paciente WHERE id=@id");
    sql.close();

    return resultado;
  } catch (error) {
    console.log(error);
  }
}

async function existPaciente(paciente) {
  try {
    const { id } = paciente;
    let conecction = await conectar();

    let resultado = await conecction.request().input("id", id).query(`
        SELECT * FROM Paciente WHERE id = ${id} `);

    sql.close();
    if (resultado.rowsAffected == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function editPaciente(paciente, data) {
  try {
    const { id } = paciente;
    const { nombre, raza, especie, id_propietario } = data;
    console.log(nombre, raza, especie, id_propietario, id);

    // if ((await existPaciente(id)) == true) {
    let conecction = await conectar();
    let resultado = await conecction
      .request()

      .input("nombre", nombre)
      .input("raza", raza)
      .input("especie", especie)
      .input("id_propietario", id_propietario)
      .input("id", id)
      .query(
        "UPDATE Paciente SET nombre= @nombre, raza=@raza, especie=@especie,id_propietario=@id_propietario  WHERE Paciente.id = @id"
      );

    sql.close();

    return resultado;
    // }
  } catch (error) {
    console.log(error);
  }
}

async function showPaciente(paciente) {
  try {
    const { id } = paciente;
    let conecction = await conectar();

    let resultado = await conecction.request().input("id", id).query(`
          SELECT * FROM Paciente WHERE id = ${id} `);

    sql.close();
    return resultado;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  conectar,
  addPaciente,
  deletePaciente,
  existPaciente,
  editPaciente,
  showPaciente
};
