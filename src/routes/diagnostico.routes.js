const express = require("express");

const services = require("../services/diagnostico.services");

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

module.exports = router;
