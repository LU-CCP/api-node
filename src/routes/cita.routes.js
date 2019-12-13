const express = require("express");
const router = express.Router();
const citaService = require("../services/cita.service");

/**
 * @swagger
 * /{id}:
 *  get:
 *      description: ruta para diltrar una cita por ID
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */

router.get("/:id", async (req, res) => {
  const result = await citaService.getConsultCitaId(req.params.id);
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

module.exports = router;
