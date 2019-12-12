const express = require("express");
const router = express.Router();
const CitaService = require("../services/cita.service");

router.put("/:id", async (req, res) => {
  const result = await CitaService.checkCita(req.params.id);
  if (!result) {
    res.status(404).json({ error: "No se encuentra la cita" });
    return;
  } else {
    let deleteCita = await CitaService.deleteCita(req.params.id);
    if (!deleteCita) {
      res.status(404).send("No puedes elminiar la cita");
      return;
    }
    res.status(200).json({ msg: "Se elimino correctamente tu cita" });
  }
});

module.exports = router;
