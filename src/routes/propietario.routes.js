const express = require("express");
const sql = require("mssql");
const router = express.Router();
<<<<<<< HEAD
const dbConfig = require("../mssqlConfig");
const server = express();
server.use(express.json());

router.post("/agregar", function(req, res) {
  console.log(req.params);
  console.log(req.body);
  const body = req.body;
  const { rut, nombre, apellido_materno, apellido_paterno, telefono } = body;
  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();
    sqlRequest.query(
      `INSERT INTO Persona values('${rut}', '${nombre}', '${apellido_materno}', '${apellido_paterno}', '${telefono}')`,
      function(error, data) {
        if (error) console.log(error);
        res.send("f");
        sql.close();
      }
    );
  });
=======

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
router.get('/:id', function (req, res) {

    sql.connect(sqlConfig.config, function (err) {
        if (err) console.log(err);
        const sqlRequest = new sql.Request();

        sqlRequest.query('select * from persona', function (error, data) {
            if (error) console.log(error);
            res.send(data);
            sql.close();
        })
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
router.post('/', async (req, res) => {
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
>>>>>>> master
});

module.exports = router;

router.get("/", function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query("select * from Persona", function(error, data) {
      if (error) console.log(error);

      res.send(data);

      sql.close();
    });
  });
});

<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;
>>>>>>> master
