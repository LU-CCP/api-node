const express = require("express");
const citasServices = require("../services/citas.services");
const router = express.Router();
/**
 * @swagger
 * path:
 *  /cita/async:
 *      get:
 *          summary: ruta para traer los datos de la tabla cita
 *          tags: [cita]
 *          parameters:
 *              -name: id
 *              in: path
 *              type: string
 *
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 *      consumes:
 *              'application/json'
 *      produces:
 *              'application/json'
 */
router.get("/async", async (req, res) => {
  try {
    let cita = await citasServices.obtenerCita();
    res.send(cita);
  } catch (error) {
    console.log(error);
  }
});
/**
 * @swagger
 path:
 *  /cita/:id:
 *      put:
 *          summary: Actualizar cita 
 *          tags: [cita]
 *         
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.put("/:id", async (req, res) => {
  const result = await CitaService.checkCita(req.params.id);
  if (!result) {
    res.status(400).json({ error: "No se encuentra la cita" });
    return;
  }
  res.status(200).send(result);
});

/**
 * @swagger
 *  path:
 *  /cita/:id:
 *      delete:
 *          summary: eliminar cita
 *          tags: [cita]
 *      parameters:
 *              -name: id
 *              in: path
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 *
 *      consumes:
 *              'application/json'
 *      produces:
 *              'application/json'
 */
router.delete("/:id", async (req, res) => {
  const result = await CitaService.checkCita(req.params.id);
  if (!result) {
    res.status(404).json({ error: "No se encuentra la cita" });
    return;
  } else {
    let deleteCita = await CitaService.deleteCita(req.params.id);
    if (!deleteCita) {
      res.status(500).json({
        error: "No puedes elminiar la cita, hubo un problema inesperado"
      });
      return;
    }
    res.status(200).json({ msg: "Se elimino correctamente tu cita" });
  }
});
module.exports = router;
