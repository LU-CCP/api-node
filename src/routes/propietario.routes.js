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


//las promesas funcionan similar a los callback
//cuando trabajamos con promesas cuando se genera un error va a caer dentro del catch
