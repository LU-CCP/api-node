const express = require("express");
const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");
const propietarioService = require("../services/propietario.service");

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

router.post("/agregar", async (request, response) => {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono,
    esMedico,
    fecha_graduacion
  } = request.body;

  try {
    if ((await propietarioService.verifPropietario(rut)) == false) {
      propietarioService.setPropietario(
        rut,
        nombre,
        apellido_materno,
        apellido_paterno,
        telefono
      );
      response.status(500).send("Propietario agregado correctamente");
    } else {
      // response.status(409).send("Propietario ya registrado");
      console.log(await propietarioService.getIdPersona(rut).recordset[0].id);
    }

    if (await esMedico) {
      if ((await propietarioService.verifMedico(rut)) == false) {
        propietarioService.setMedico(
          await propietarioService.getIdPersona(rut).recordset[0].id,
          fecha_graduacion
        );
        response.send("Medico agregado correctamente");
      } else {
        response.status(409).send("Medico ya registrado");
      }
    }
  } catch (err) {
    response.status(400).send(err);
  }
});

module.exports = router;
