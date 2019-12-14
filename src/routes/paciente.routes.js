const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");
const funciones = require("../services/paciente.service");

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query(
      "select paciente.nombre, Persona.nombre from paciente, Persona WHERE paciente.id = Persona.id;",
      function(error, data) {
        if (error) console.log(error);

        res.send(data);

        sql.close();
      }
    );
  });
});

router.post("/addPaciente", async function(req, res) {
  try {
    let query = await funciones.addPaciente(req.body);
    res.end("Paciente agregado con exito!");
  } catch (error) {
    res.send("error al agregar");
    console.log(error);
  }
});

router.get("/delPaciente/:id", async function(req, res) {
  try {
    let i = await funciones.deletePaciente(req.params);
    res.end("Eliminado!");
  } catch (error) {
    console.log(error);
    res.send("no se pudo eliminar!");
  }
});

router.get("/existe/:id", async function(req, res) {
  try {
    if ((await funciones.existPaciente(req.params)) == true) {
      res.end("si existe");
    } else {
      res.end("no existe");
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async function(req, res) {
  try {
    if ((await funciones.existPaciente(req.params)) == true) {
      let i = await funciones.editPaciente(req.params, req.body);
      res.end("se edito correctamente!");
    } else {
      res.end("el paciente no existe!");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/show/:id", async function(req, res) {
  try {
    let i = await funciones.showPaciente(req.params);
    res.send(i);
  } catch (error) {}
});

module.exports = router;
