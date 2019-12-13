const express = require("express");
const router = express.Router();
const CitaService = require("../services/cita.service");

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
