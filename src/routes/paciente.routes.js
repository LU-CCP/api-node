const express = require("express");
const router = express.Router();

const {
  ingresoPaciente,
  getPropietario
} = require("../services/paciente.service.js");

/**
 * @swagger
 * /paciente:
 *  post:
 *      description: Utilizado para ingresar un campo en la base de datos
 *      responses:
 *          '201':
 *              description: Ingreso Exitoso!
 *          '400':
 *              description: Recurso no encontrado
 */

router.post("/", async (req, res) => {
  const { body } = req;
  const { id_propietario } = body;
  if (await getPropietario(id_propietario)) {
    res.status(400).send({ message: "Error, Propietario not found" });
  } else {
    res.status(201).send(await ingresoPaciente(body));
  }
});

module.exports = router;
