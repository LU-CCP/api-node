const express = require("express");
const citasServices = require("../services/citas.services");
const router = express.Router();
/**
 * @swagger
 * /async :
 *  get:
 *      description: ruta para traer los datos de la tabla cita
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
 * /:id :
 *  put:
 *      description: Ruta para modificar una cita
 *      responses:
 *          '200':
 *              description: actualizacion exitosa!
 *          '404':
 *              description: Recurso no encontrado
 *           '500':
 *               description: No se puede actualizar, error no identificado
 *      consumes:
 *              'application/json'
 *      produces:
 *              'application/json'
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
 * /:id :
 *  delete:
 *      description: Ruta para eliminar una cita por su ID unica
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 *           '500':
 *               description: No se puede eliminar, error no identificado
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
