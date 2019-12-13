const express = require("express");
const diagnosticoService = require("../services/diagnostico.service");

const router = express.Router();

/**
 * @swagger
 * /diagnostico/filtrar/{id_cita}:
 *  get:
 *      parameters:
 *      - in: path
 *        name: id_cita
 *        description: Utilizado para buscar un nuevo diagnostico por id de cita
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */

router.get("/filtrar/:id_cita", async (req, res) => {
  const result = await diagnosticoService.obtenerPacientesParams(
    req.params.id_cita
  );
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).send("diagnostico no encontrado");
});

/**
 * @swagger
 * /diagnostico/filtrarId/{id}:
 *  get:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: Utilizado para buscar un nuevo diagnostico por id de diagnostico
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */

router.get("/filtrarId/:id", async (req, res) => {
  const result = await diagnosticoService.obtenerPacientesId(req.params.id);
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).send("diagnostico no encontrado");
});

module.exports = router;
