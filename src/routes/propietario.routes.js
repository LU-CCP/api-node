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
router.get('/test', function (req, res) {

<<<<<<< HEAD
router.get("/", function(req, res) {
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

router.post("/add", function(req, res) {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  } = req.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();
    sqlRequest.input("rut", rut);
    sqlRequest.input("nombre", nombre);
    sqlRequest.input("apellido_materno", apellido_materno);
    sqlRequest.input("apellido_paterno", apellido_paterno);
    sqlRequest.input("telefono", telefono);
    sqlRequest.query(
      "INSERT INTO Persona VALUES(@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)",
      function(error, data) {
        if (error) console.log(error);

        res.send(data);
        sql.close();
      }
    );
  });
});

router.post("/addcita", function(req, res) {
  const { id_paciente, motivo_consulta, id_medico, monto } = req.body;
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();
    sqlRequest.input("id_paciente", sql.BigInt, id_paciente);
    sqlRequest.input("id_medico", sql.BigInt, id_medico);
    sqlRequest.input("motivo_consulta", sql.VarChar, motivo_consulta);
    sqlRequest.input("monto", sql.Money, monto);
    sqlRequest.query("SELECT id FROM paciente WHERE id=@id_paciente", function(
      error,
      resultPaciente
    ) {
      sqlRequest.query(
        "SELECT id FROM medico_veterinario WHERE id = @id_medico",
        function(error, resultVeterinario) {
          if (
            resultPaciente.recordsets[0].length &&
            resultVeterinario.recordsets[0].length
          ) {
            sqlRequest.query(
              "INSERT INTO cita VALUES(getdate(), @id_paciente, @motivo_consulta, @id_medico, @monto)",
              function(error, data) {
                res.json({ msg: "Se agendo tu cita correctamente" });
              }
            );
          } else {
            res.status(400).json({
              error:
                "Lo siento pero no se encuentra el veterinario o el paciente"
            });
          }
          sql.close();
        }
      );
    });
  });
});

//promises
router.get('/promise', function (req, res) {
  sql.connect(sqlConfig.config)
      .then(function (conn) {
          return conn.query('select * from persona');
      })
      .then(data => {
          res.send(data);
      })
      .catch(error => console.log(error))
});

//async await
router.get('/async', async (req, res) => {

  try {
      let conn = await sql.connect(sqlConfig.config);

      let result = await conn.request().query('select * from persona');

      sql.close();

      res.send(result);
  }
  catch (error) {
      console.log(error)
  }
module.exports = router;
>>>>>>> master
