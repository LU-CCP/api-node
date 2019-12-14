const express = require("express");
const router = express.Router();
const medicamentoService = require("../services/medicamentos.service");

/**
 * @swagger
 * /medicamento/buscar/{id}:
 *  get:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: Utilizado para buscar un nuevo medicamento por id
 *        schema:
 *          type: object
 *          required:
 *            - true
 *          properties:
 *            id:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */
router.get("/buscar/:id", async (req, res) => {
  const result = await medicamentoService.getMedicamento(req.params.id);
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).send(result);
});

/**
 * @swagger
 * /medicamento/buscarnombre/{nombre}:
 *  get:
 *      parameters:
 *      - in: path
 *        name: nombre
 *        description: Utilizado para buscar un nuevo medicamento por nombre
 *        schema:
 *          type: object
 *          required:
 *            - true
 *          properties:
 *            nombre:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */
router.get("/buscarnombre/:nombre", async (req, res) => {
  const result = await medicamentoService.getMedicamentoPorNombre(
    req.params.nombre
  );
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).send(result);
});

/**
 * @swagger
 * /medicamento/:
 *  post:
 *      parameters:
 *      - in: body
 *        name: medicamento
 *        description: Utilizado para insertar un nuevo medicamento
 *        schema:
 *          type: object
 *          required:
 *            - medicamento
 *          properties:
 *            nombre:
 *              type: string
 *            dosis:
 *              type: integer
 *            unidad_medida:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */
router.post("/", async (req, res) => {
  res.send("medicamento insert");
  await medicamentoService.insertMedicamento(req.body);
});

/**
 * @swagger
 * /medicamento/delete:
 *  delete:
 *      parameters:
 *      - in: body
 *        name: medicamento
 *        description: Utilizado para eliminar un medicamento
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id:
 *              type: integer
 *            nombre:
 *              type: string
 *            dosis:
 *              type: integer
 *            unidad_medida:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */
router.delete("/delete", async (req, res) => {
  res.send("medicamento delete");
  if (await medicamentoService.getMedicamento(req.body.id)) {
    res.statusCode = 400;
    res.end("El medicamento a eliminar no existe");
    return;
  }
  medicamentoService.deleteMedicamento(req.body.id);
});

/**
 * @swagger
 * /medicamento/update:
 *  post:
 *      parameters:
 *      - in: body
 *        name: medicamento
 *        description: Utilizado para modificar un medicamento
 *        schema:
 *          type: object
 *          required:
 *            - diagnostico
 *          properties:
 *            id:
 *              type: integer
 *            nombre:
 *              type: string
 *            dosis:
 *              type: integer
 *            unidad_medida:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *          '404':
 *              description: Recurso no encontrado
 */
router.post("/update", async (req, res) => {
  const result = await medicamentoService.getMedicamento(req.body.id);
  console.log("result del route: ", result);
  if (!result) {
    res.status(404);
    res.end("El medicamento a modificar no existe");
    return;
  }
  if (medicamentoService.updateMedicamento(req.body)) {
    res.send("medicamento modificado");
  }
});

module.exports = router;
