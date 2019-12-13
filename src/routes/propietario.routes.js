const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");
const funciones = require("../services/propietario.service");

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

router.get("/filter/:nombre", async (req, response) => {
  if (funciones.compruebaPropietario) {
    let propietario = await funciones.fitraPorNombre(req.params);
    response.send(propietario.recordset);
  }
});
module.exports = router;
