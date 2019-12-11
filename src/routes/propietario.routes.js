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
  //     sql.connect(sqlConfig.config, function (err) {

  //         if (err) console.log(err);

  //         const sqlRequest = new sql.Request();

  //         sqlRequest.query('select * from persona', function (error, data) {

  //             if (error) console.log(error);

  //             res.send(data);

  //             sql.close();
  //         })
  //     });

  // });

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
        "select * from paciente where id = @id_paciente",
        function(error, data) {
          if (error) console.log(error);

          res.send(data.recordsets);

          if (data.recordsets[0] == 0) sql.close();
        }
      );
    });

    //promises
    router.get("/promise", function(req, res) {
      sql
        .connect(sqlConfig.config)
        .then(function(conn) {
          return conn.query("select * from persona");
        })
        .then(data => {
          res.send(data);
        })
        .catch(error => console.log(error));
    });

    //async await
    router.get("/async", async (req, res) => {
      try {
        let conn = await sql.connect(sqlConfig.config);

        let result = await conn.request().query("select * from persona");

        sql.close();

        res.send(result);
      } catch (error) {
        console.log(error);
      }

      sqlRequest.query(
        "insert into cita values(@fecha, @id_paciente,@motivo_consulta,@id_medico,@monto)",
        function(error, data) {
          if (error) console.log(error);

          res.send(data.recordsets);

          sql.close();
        }
      );
    });
  });
});

module.exports = router;
