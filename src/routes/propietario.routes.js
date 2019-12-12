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
 * /save:
 *  post:
 *      description: Ingreso de nuevo propietario
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */
router.post("/save", async (req, res) => {
  let propietario = await servicesPropietario.getPropietario(req.body);
  res.end("Propietario guardado");
});

/**
 * @swagger
 * /delete:
 *  get:
 *      description: Eliminar propietario existente a partir del id del propietario
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */
router.get("/delete/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.deletePropietario(req.params);
    res.end("Propietario eliminado");
  }
});

/**
 * @swagger
 * /edit:
 *  put:
 *      description: Actualizar datos de un propietario existente a partir del id del propietario
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */
router.put("/edit/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.editPropietario(req);
    res.end("Propietario editado");
  }
});

/**
 * @swagger
 * /show:
 *  get:
 *      description: Obtener datos de un propietario a partir del su id
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */
router.get("/show/:id", async (req, res) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.showPropietario(req.params);
    res.send(propietario);
  }
});

/**
 * @swagger
 * /filter:
 *  get:
 *      description: Obtener listado de propietarios filtrado por *
 *      responses:
 *          '200':
 *              description: Respuesta exitosa!
 *          '404':
 *              description: Recurso no encontrado
 */
router.get("/filter/:nombre", async (req, response) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.filterPropietario(req.params);
    response.send(propietario);
  }
});

router.get("/prueba/:id", async (req, response) => {
  if (servicesPropietario.existsPropietarioId) {
    let propietario = await servicesPropietario.existsPropietarioId(req.params);
    response.send(propietario);
  }
});

module.exports = router;
