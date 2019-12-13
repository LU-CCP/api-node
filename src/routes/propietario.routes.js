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
  //     sql.connect(sqlConfig.config, function (err) {

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
    //         if (err) console.log(err);

    //         const sqlRequest = new sql.Request();

    //         sqlRequest.query('select * from persona', function (error, data) {

    //             if (error) console.log(error);

    //             res.send(data);

    //             sql.close();
    //         })
    //     });

    // });

    router
      .post("/", function(req, res) {
        const {
          fecha,
          id_paciente,
          motivo_consulta,
          id_medico,
          monto
        } = req.body;
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
      })
      .then(data => {
        res.send(data);
      })
      .catch(error => console.log(error));
  });

  //promises
  router.get("/promise", function(req, res) {
    sql.connect(sqlConfig.config).then(function(conn) {
      return conn.query("select * from persona");

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
        sql.connect(sqlConfig.config).then(function(conn) {
          return conn.query("select * from persona");

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
    });
  });
});
module.exports = router;
