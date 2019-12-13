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
 *      description: Pagina creada para el registro de pacientes
 *      responses:
 *          '200':
 *              description: Agregado con exito!
 *          '404':
 *              description: Fallo al agregar
 */
//async await
router.post("/registrarpropietario", async (req, res) => {
  const {
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono,
    esmedico,
    fecha_graduacion
  } = req.body;
  const answ = propietarioService.guardarUsuario(
    rut,
    nombre,
    apellido_materno,
    apellido_paterno,
    telefono
  );
  if (answ == true) {
    res.send("Usuario registrado exitosamente, agregado a medico tambien!");
  } else {
    res.status(409).send("Usuario ya registrado previamente");
  }
});

router.get("/buscarpropietario", async (req, res) => {
  sqlRequest = new sql.Request();
  const { rut } = req.body;
  const comando1 = "SELECT * FROM Persona p WHERE p.rut=@rut";
  if ((await propietarioService.verificarUsuario(rut)) == false) {
    try {
      let conn = await sql.connect(sqlConfig.config);
      await conn
        .input("rut", id)
        .request()
        .query(comando1);

      let result = await conn.request().query(comando1);
      sql.close();

      res.send(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    Response.status(404).send("Usuario no encontrado");
  }
});

module.exports = router;
