const citaServices = require("../services/cita.services");
const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const result = await citaService.checkCita(req.params.id);
  if (!result) {
    res.status(404).json({ error: "No se encuenta la cita" });
    return;
  } else {
    res.status(200).send(result);
  }
});

router.get("/", async (req, res) => {
  const result = await citaService.getConsultaCita(req.params);
  if (!result) {
    res.status(404).json({ error: "No hay datos para mostrar" });
  } else {
    res.status(200).send(result);
  }
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

router.post("/post", async (req, res) => {
  const result = await citaServices.citaValida(req.body);
  if (!result) {
    res.status(400).json({ error: "ID medico/paciente invalido" });
    return;
  } else {
    citaServices.postCita(req.body);
    res.status(200).send("añadido");
  }
});

router.delete("delete/:id", async (req, res) => {
  const result = await CitaService.checkCita(req.params.id);
  if (!result) {
    res.status(404).json({ error: "No se encuentra la cita" });
    return;
  } else {
    let deleteCita = await CitaService.deleteCita(req.params.id);
    if (!deleteCita) {
      res.status(500).json({
        error: "No puedes eliminar la cita, hubo un problema inesperado"
      });
      return;
    }
    res.status(200).json({ msg: "Se elimino correctamente tu cita" });
  }
});

module.exports = router;
