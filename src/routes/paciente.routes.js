const express = require("express");
const router = express.Router();

const {
  updatePaciente,
  deletePaciente,
  getPropietario,
  ingresoPaciente,
  getPacientes,
  getPaciente
} = require("../services/paciente.service.js");

const buscar_paciente = require("../services/paciente.service");

/**
 * @swagger
 * path:
 *  /paciente/{id}:
 *    get:
 *      summary: obtiene un paciente
 *      tags: [Paciente]
 *      parameters:
 *      - name: id
 *        in: path
 *        type: integer
 *      responses:
 *        "404":
 *          description: Paciente not found
 *        "200":
 *          description: Éxito!
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (await buscar_paciente.obtener_paciente(id)) {
    res.send(await buscar_paciente.obtener_paciente(id));
  }
});

/**
 * @swagger
 *  /paciente:
 *    post:
 *      summary: Creates a new Paciente.
 *      consumes:
 *        - application/json
 *      tags:
 *        [Paciente]
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - nombre
 *              - raza
 *              - especie
 *              - id_propietario
 *              - sexo
 *              - fecha_nacimiento
 *            properties:
 *              nombre:
 *                type: string
 *              raza:
 *                type: string
 *              especie:
 *                type: string
 *              id_propietario:
 *                type: integer
 *              sexo:
 *                type: boolean
 *              fecha_nacimiento:
 *                type: string
 *      responses:
 *        201:
 *          description: New Paciente created!
 *        404:
 *          description: Propietario not found!
 */
router.post("/", async (req, res) => {
  const { body } = req;
  const { id_propietario } = body;
  if ((await getPropietario(id_propietario)) == 0) {
    res.status(404).send({ message: "Error, Propietario not found" });
  } else {
    res.status(201).send(await ingresoPaciente(body));
  }
});

/**
 * @swagger
 *  /paciente/{id}:
 *    put:
 *      summary: Update a Paciente.
 *      consumes:
 *        - application/json
 *      tags:
 *        [Paciente]
 *      parameters:
 *      - name: id
 *        in: path
 *        type: integer
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *            type: object
 *            required:
 *              - nombre
 *              - raza
 *              - especie
 *              - id_propietario
 *              - sexo
 *              - fecha_nacimiento
 *            properties:
 *              nombre:
 *                type: string
 *              raza:
 *                type: string
 *              especie:
 *                type: string
 *              id_propietario:
 *                type: integer
 *              sexo:
 *                type: boolean
 *              fecha_nacimiento:
 *                type: string
 *      responses:
 *        201:
 *          description: Paciente updated!
 *        404:
 *          description: Propietario not found!
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { id_propietario } = body;
  if ((await getPropietario(id_propietario)) == 0) {
    res.status(404).send({ message: "Error, Propietario not found" });
  } else {
    res.status(201).send(await updatePaciente(id, body));
  }
});

/**
 * @swagger
 * path:
 *  /paciente/{id}:
 *    delete:
 *      summary: obtiene un paciente
 *      tags: [Paciente]
 *      parameters:
 *      - name: id
 *        in: path
 *        type: integer
 *      responses:
 *        "200":
 *          description: Paciente deleted successfully!
 *        404:
 *          description: Paciente not found!
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if ((await getPaciente(id)) == 0) {
    res.status(404).send({ message: "Error, Paciente not found" });
  } else {
    res.status(200).send(await deletePaciente(id));
  }
});

/**
 * @swagger
 * path:
 *  /paciente/{propiedad}/{busqueda}:
 *    get:
 *      summary: obtiene el listado de usuarios
 *      tags: [Paciente]
 *      parameters:
 *      - name: propiedad
 *        in: path
 *        type: string
 *      - name: busqueda
 *        in: path
 *        type: string
 *      responses:
 *        "200":
 *          description: ok!
 */
router.get("/:propiedad/:busqueda", async (req, res) => {
  const { propiedad, busqueda } = req.params;
  if ((await getPacientes(propiedad, busqueda)) != null) {
    res.status(200).send(await getPacientes(propiedad, busqueda));
  } else res.status(404).send("error");
});

module.exports = router;
