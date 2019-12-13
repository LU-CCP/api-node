const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");
const servicesPropietario = require("../services/propietario.service");

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
});

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */

/**
 * @swagger
 * path:
 *  /propietario/save:
 *      post:
 *          summary: Ingreso de nuevo propietario
 *          tags: [Propietario]
 *          parameters:
 *              -name: rut
 *              in: body
 *              type: string
 *              -name: nombre
 *              in: body
 *              type: string
 *              -name: apellido_materno
 *              in: body
 *              type: string
 *              -name: apellido_paterno
 *              in: body
 *              type: string
 *              -name: telefono
 *              in: body
 *              type: string
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.post("/save", async (req, res) => {
  let propietario = await servicesPropietario.savePropietario(req.body);
  res.end("Propietario guardado");
});

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */
/**
 * @swagger
 * path:
 *  /propietario/delete/:id:
 *      get:
 *          summary: Eliminar propietario existente a partir del id del propietario
 *          tags: [Propietario]
 *          parameters:
 *              -name: id
 *              in: path
 *              type: string
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '201':
 *                  description: Propietario creado!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.get("/delete/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.deletePropietario(req.params);
    res.end("Propietario eliminado");
  }
});

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */
/**
 * @swagger
 *
 *  path:
 *  /propietario/edit/:id:
 *      put:
 *          summary: Actualizar datos de un propietario existente a partir del id del propietario
 *          tags: [Propietario]
 *          parameters:
 *              -name: id
 *              in: path
 *              type: string
 *              -name: rut
 *              in: body
 *              type: string
 *              -name: nombre
 *              in: body
 *              type: string
 *              -name: apellido_materno
 *              in: body
 *              type: string
 *              -name: apellido_paterno
 *              in: body
 *              type: string
 *              -name: telefono
 *              in: body
 *              type: string
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.put("/edit/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.editPropietario(req);
    res.end("Propietario editado");
  }
});

/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */
/**
 * @swagger
 *
 *  path:
 *  /propietario/show/:id:
 *      get:
 *          summary: Obtener datos de un propietario a partir del su id
 *          tags: [Propietario]
 *          parameters:
 *              -name: id
 *              in: path
 *              type: string
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.get("/show/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.showPropietario(req.params);
    res.send(propietario.recordset);
  }
});
/**
 * @swagger
 * tags:
 *   name: Propietario
 *   description: Rutas del propietario
 */

/**
 * @swagger
 *  path:
 *  /propietario/filter/:nombre:
 *      get:
 *          summary: Obtener listado de propietarios filtrado por el nombre
 *          tags: [Propietario]
 *          parameters:
 *              -name: nombre
 *              in: path
 *              type: string
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa!
 *              '400':
 *                  description: Parámetros request inválidos
 *              '404':
 *                  description: Recurso no encontrado
 *              '500':
 *                  description: Internal Server Error
 */
router.get("/filter/:nombre", async (req, response) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.filterPropietario(req.params);
    response.send(propietario.recordset);
  }
});

module.exports = router;
