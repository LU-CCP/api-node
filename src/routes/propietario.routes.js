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

  const comando1 =
    "INSERT INTO Persona VALUES(@rut, @nombre, @apellido_materno, @apellido_paterno, @telefono)";
  const comando2 =
    "INSERT INTO medico_veterinario VALUES(@id_persona, @fecha_graduacion)";
  if ((await propietarioService.consultarUsuarioGuardado(rut)) == true) {
    try {
      let conn = await sql.connect(sqlConfig.config);
      await conn
        .request()
        .input("rut", rut)
        .input("nombre", nombre)
        .input("apellido_materno", apellido_materno)
        .input("apellido_paterno", apellido_paterno)
        .input("telefono", telefono)
        .query(comando1);

      if (await esmedico) {
        if (propietarioService.consultarMedicoRegistrado(rut) == true) {
          await conn
            .request()
            .input("id_persona", propietarioService.devolverIdPersona(rut))
            .input("fecha_graduacion", fecha_graduacion)
            .query(comando2);

          sql.close();

          res.send(
            "Usuario registrado exitosamente, agregado a medico tambien!"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(409).send("Usuario ya registrado previamente");
  }
});

router.get("/buscarpropietario", async (req, res) => {
  sqlRequest = new sql.Request();
  const { rut } = req.body;
  const comando1 = "SELECT * FROM Persona p WHERE p.rut=@rut";
  if (verificarUsuario(rut) == false) {
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
