const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send("ruta get paciente");
});

module.exports = router;
