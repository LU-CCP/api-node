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
router.get("/test", function(req, res) {
  // router.get('/', function (req, res) {
  // sql.connect(sqlConfig.config, function (err) {
  //     if (err) console.log(err);
  //     const sqlRequest = new sql.Request();
  //     sqlRequest.query('select * from persona', function (error, data) {
  //         if (error) console.log(error);
  //         res.send(data);
  //         sql.close();
  //     })
  //     });
});

router.post("/", function(req, res) {
  const { fecha, id_paciente, motivo_consulta, id_medico, monto } = req.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.input("fecha", fecha);
    sqlRequest.input("id_paciente", id_paciente);
    sqlRequest.input("motivo_consulta", motivo_consulta);
    sqlRequest.input("id_medico", id_medico);
    sqlRequest.input("monto", monto);

    sqlRequest.query(
      "select paciente.id, medico_veterinario.id from paciente, medico_veterinario where paciente.id=@id_paciente and medico_veterinario.id=@id_medico",
      function(error, data) {
        if (data.recordsets[0] == 0) {
          console.log(res.statusCode);
          res.send(
            "ha ocurrido un error completamente esperado por parte tuya maldito bastardo"
          );
        } else {
          sqlRequest.query(
            "INSERT INTO cita VALUES (@fecha,@id_paciente,@motivo_consulta,@id_medico,@monto);",
            function(error, data) {
              if (error) console.log(error);

              res.send(data.recordsets);

              sql.close();
            }
          );
        }
      }
    );
  });
});

module.exports = router;
