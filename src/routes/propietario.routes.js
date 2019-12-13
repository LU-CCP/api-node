const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");
const funciones = require("../services/propietario.service");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */

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
/*router.get('/:id', function (req, res) {

    sqlRequest.query("select * from persona", function(error, data) {
      if (error) console.log(error);
      res.send(data);
      sql.close();
    });
  });
});

*/

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
router.get("/listaPersonas", async (req, res) => {
  try {
    let data = await funciones.listaPropietario(req, res);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addPersonas", async (req, res) => {
  try {
    let i = await funciones.agregaPropietario(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:id", async (req, res) => {
  if (funciones.compruebaPropietario) {
    let propietario = await funciones.borraPropietario(req.params);
    res.end("Propietario eliminado");
  }
});

router.put("/edit/:id", async (req, res) => {
  if (funciones.compruebaPropietario) {
    let propietario = await funciones.actualizaPropietario(req);
    res.end("Datos actualizados");
  }
});

router.get("/show/:id", async (req, res) => {
  if (funciones.compruebaPropietario) {
    let propietario = await funciones.buscaPorId(req.params);
    res.send(propietario.recordset);
  }
});

module.exports = router;
