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
 *        description: Utilizado para buscar un medicamento por id
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
  res.status(404).send("Medicamento no encontrado");
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
  const result = await medicamentoService.insertMedicamento(req.body);
  if (result) {
    res.status(200).send("Medicamento insertado correctamente");
  }
  res.status(404).send("ocurrio un problema");
});

/**
 * @swagger
 * /medicamento/delete/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
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
router.delete("/delete/:id", async (req, res) => {
  //res.send("medicamento delete");
  const result = await medicamentoService.getMedicamento(req.params.id);
  if (result) {
    res.status(200).send("Medicamento eliminado correctamente");
    medicamentoService.deleteMedicamento(req.params.id);
  }
  res.status(404).send("El medicamento a eliminar no existe");
});

module.exports = router;
