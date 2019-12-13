const express = require("express");
// const sql = require("mssql");
// const sqlConfig = require("../mssqlConfig");
const citaServicios = require("../services/cita.service");

const router = express.Router();

//callbacks
/**
 * @swagger
 * /test:
 *  get:
 *      description: Utilizado a modo de prueba para testear el swagger
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */

//async await
router.post("/post", async (req, res) => {
  citaServicios.postCita(req.body);
  res.status(200).send("La informacion a sido insertada");
});

// //async await
// router.post("/", async (req, res) => {
//   citaServicios.postCita(req.body);
//   //   res.status(200).send(result);
// });

module.exports = router;
