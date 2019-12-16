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

//async await
router.post("/add", async (req, res) => {
  
  try {
    let connection = await sql.connect(sqlConfig.config);

    let data = await connection.query(
      `INSERT INTO cita (fecha, id_paciente, motivo_consulta, id_medico, monto) VALUES ('${fecha}','${idPaciente}','${motivoConsulta}','${idMedico}',${monto})`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
