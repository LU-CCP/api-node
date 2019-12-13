const citaServices = require("../services/cita.services");
const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let conn = await sql.connect(sqlConfig.config);

    let result = await conn.request().query("select * from cita");

    sql.close();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  postCita(req.body, res);
});

router.put("/update/:id", async (req, res) => {
  const result = await citaServices.checkCita(req.params.id);
  if (!result) {
    res.status(400).json({ error: "No se encuentra la cita" });
    return;
  }
  citaServices.putCita(req.body, req.params);
  res.status(200).send(result);
});

router.post("/crear", async (req, res) => {
  const result = await citaServices.citaValida(req.body);
  if (!result) {
    res.status(400).json({ error: "ID medico/paciente invalido" });
    return;
  } else {
    citaServices.postCita(req.body);
    res.status(200).send("Agregado");
  }
});

module.exports = router;
