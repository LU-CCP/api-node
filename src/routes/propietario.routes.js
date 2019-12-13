const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
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

    /**
     * @swagger
     * path:
     *  /propietario/{id}:
     *    get:
     *      summary: obtiene el listado de usuarios
     *      tags: [Propietario]
     *      parameters:
     *      - name: id
     *        in: path
     *        type: string
     *      responses:
     *        "200":
     *          description: A user schema
     */
    router.get("/:id", function(req, res) {
      sql.connect(sqlConfig.config, function(err) {
        if (err) console.log(err);
        const sqlRequest = new sql.Request();

        sqlRequest.query("select * from persona", function(error, data) {
          if (error) console.log(error);
          res.send(data);
          sql.close();
        });
      });
    });

    /**
     * @swagger
     * path:
     *  /propietario/:
     *    post:
     *      summary: registra un propietario
     *      tags: [Propietario]
     *      parameters:
     *      - name
     *      - in: body
     *        name: diagnostico
     *        description: Agrega un diagnóstico.
     *        schema:
     *          type: object
     *          required:
     *            - diagnostico
     *          properties:
     *            id_cita:
     *              type: integer
     *              value: 1
     *            descripcion:
     *              type: string
     *      requestBody:
     *        required: true
     *      responses:
     *        "200":
     *          description: A user schema
     */
    router.post("/", async (req, res) => {});

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
});
module.exports = router;
