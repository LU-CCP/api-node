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

// router.put("/:id", async (req, res) => {
//   const result = await CitaService.checkCita(req.params.id);
//   if (!result) {
//     res.status(400).json({ error: "No se encuentra la cita" });
//     return;
//   }
//   res.status(200).send(result);
// });

router.put("/update/:id", async (req, res) => {
  const result = await citaServices.checkCita(req.params.id);
  if (!result) {
    res.status(400).json({ error: "No se encuentra la cita" });
    return;
  }
  citaServices.putCita(req.body, req.params);
  res.status(200).send(result);
});

module.exports = router;
