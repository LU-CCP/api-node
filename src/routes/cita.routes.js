const express = require("express");
const router = express.Router();
const CitaService = require("../services/cita.service");

/**
 * @swagger
 * path:
 *  /cita/{id}:
 *      delete:
 *          summary: Eliminar una cita por su Id
 *          tags: [CITA]
 *          parameters:
 *            - in: path
 *              name: id
 *              descripcion: Elmininar una Cita
 *              schema:
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
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
        error: "No puedes eliminar la cita, hubo un problema inesperado"
      });
      return;
    }
    res.status(200).json({ msg: "Se elimino correctamente tu cita" });
  }
});

module.exports = router;
