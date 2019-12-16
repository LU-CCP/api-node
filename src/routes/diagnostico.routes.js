const express = require("express");
const services = require("../services/diagnostico.service");
const router = express.Router();

/**
 * @swagger
 * /diagnostico:
 *  post:
 *      parameters:
 *      - in: body
 *        name: diagnostico
 *        description: Agrega un diagnóstico.
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id_cita:
 *              type: integer
 *            descripcion:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 *          '400':
 *              description: Request not be understood by the server
 */
router.post("/", async (request, response) => {
  if (await services.encontrarIdCita(request.body.id_cita)) {
    try {
      const results = await services.agregar(request.body);
      response.status(200).send(results);
    } catch (error) {
      console.log(error);
      response.status(404).send("Error 404");
    }
  } else {
    response.status(400).send("Id cita no encontrado");
  }
});

/**
 * @swagger
 * /diagnostico/{diagnosticoId}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: diagnosticoId
 *        type: integer
 *        required: true
 *        description: Diagnóstico id.
 *      - in: body
 *        name: diagnostico
 *        description: Editar un diagnóstico.
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id_cita:
 *              type: integer
 *            descripcion:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 *          '400':
 *              description: Request not be understood by the server
 */
router.put("/:diagnosticoId", async (request, response) => {
  console.log("id", request.params.diagnosticoId);
  if (await services.encontrarIdDiagnostico(request.params.diagnosticoId)) {
    try {
      const results = await services.editar(
        request.params.diagnosticoId,
        request.body
      );
      response.status(200).send(results);
    } catch (error) {
      console.log(error);
      response.status(404).send("Error 404");
    }
  } else {
    response.status(400).send("Id diagnóstico no encontrado");
  }
});

/**
 * @swagger
 * /diagnostico/{diagnosticoId}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: diagnosticoId
 *        type: integer
 *        required: true
 *        description: Diagnóstico id.
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 *          '400':
 *              description: Request not be understood by the server
 */
router.delete("/:diagnosticoId", async (request, response) => {
  if (await services.encontrarIdDiagnostico(request.params.diagnosticoId)) {
    try {
      const results = await services.eliminar(request.params.diagnosticoId);
      response.status(200).send(results);
    } catch (error) {
      console.log(error);
      response.status(404).send("Error 404");
    }
  } else {
    response.status(400).send("Id diagnostico no encontrado");
  }
});

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
  const result = await services.obtenerPacientesParams(req.params.id_cita);
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
  const result = await services.obtenerPacientesId(req.params.id);
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).send("diagnostico no encontrado");
});

module.exports = router;
