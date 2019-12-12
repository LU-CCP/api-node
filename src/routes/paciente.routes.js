const express = require("express");
const router = express.Router();
import { deletepaciente } from "../services/paciente.service";

router.get("/", function(req, res) {
  res.send("ruta get paciente");
});

router.delete("/:id", function(req, res) {
  const { id } = req.params;
  res.send(deletepersona(id));
});
module.exports = router;
