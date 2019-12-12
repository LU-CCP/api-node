const express = require("express");
const router = express.Router();
const citaService = require("../services/cita.service");

router.get("/:id", async (req, res) => {
  const result = await citaService.getConsultCitaId(req.params.id);
  if (!result) {
    res.status(404).json({ error: "No se encuenta la cita" });
    return;
  } else {
    res.status(200).send(result);
  }
});

router.get("/", async (req, res) => {});

module.exports = router;
