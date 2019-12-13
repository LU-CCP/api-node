const express = require("express");
const citasServices = require("../services/citas.services");
const router = express.Router();

router.get("/async", async (req, res) => {
  try {
    let cita = await citasServices.obtenerCita();
    res.send(cita);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  const result = await CitaService.checkCita(req.params.id);
  if (!result) {
    res.status(400).json({ error: "No se encuentra la cita" });
    return;
  }
  res.status(200).send(result);
});
module.exports = router;
