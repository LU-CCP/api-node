const express = require("express");
const router = express.Router();
const deletePaciente = require("../services/paciente.service");

router.get("/", function(req, res) {
  res.send("ruta get paciente");
});

router.delete("/:id", function(req, res) {
  const { id } = req.params;
  res.send(deletePaciente(id));
});

module.exports = router;
