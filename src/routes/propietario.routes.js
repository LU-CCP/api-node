const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

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

//async await Obtencion de datos
// router.get("/", async (req, res) => {
//   sql.connect(sqlConfig.config, function(error) {
//     const sqlRequest = new sql.Request();

//     sqlRequest.query("select * from persona", function(error, data) {
//       res.send("Respuesta");
//     });
//   });
// });
// router.get("/", async (req, res) => {
//   sql
//     .connect(sqlConfig.config)
//     .then(() => {
//       return sqlRequest.query("select * from persona");
//     })
//     .then(data => {
//       res.send(data);
//     });
// });
router.get("/", async (req, res) => {
  try {
    let connection = await sql.connect(sqlConfig.config);

    let data = await connection.query("SELECT * FROM cita");
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// //async await
// router.post("/post", async (req, res) => {
//   if (PropietarioServices.getPropietario(req.body.IdPropietario)) {
//     res.statusCode = 400;
//     res.end("no se encontro el propietario");
//     return;
//   }
//   PacienteService.setPaciente(req.body);
// });

module.exports = router;
