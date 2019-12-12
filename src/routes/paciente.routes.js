const express = require("express");
const router = express.Router();

const {
  updatePaciente,
  deletePaciente,
  getPropietario,
  ingresoPaciente,
  getPacientes
} = require("../services/paciente.service.js");

const buscar_paciente = require("../services/paciente.service");

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
 *        "404":
 *          description: User not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (await buscar_paciente.obtener_paciente(id)) {
    res.send(await buscar_paciente.obtener_paciente(id));
  }
});

/**
 * @swagger
 * path:
 *  /propietario:
 *    post:
 *      summary: obtiene el listado de usuarios
 *      tags: [Propietario]
 *      responses:
 *        "400":
 *          description: Paciente bad
 *        "201":
 *          description: ok!
 */
router.post("/", async (req, res) => {
  const { body } = req;
  const { id_propietario } = body;
  if ((await getPropietario(id_propietario)) == 0) {
    res.status(400).send({ message: "Error, Propietario not found" });
  } else {
    res.status(201).send(await ingresoPaciente(body));
  }
});

/**
 * @swagger
 * path:
 *  /propietario/{id}:
 *    put:
 *      summary: obtiene el listado de usuarios
 *      tags: [Propietario]
 *      parameters:
 *      - name: id
 *        in: path
 *        type: string
 *      responses:
 *        "400":
 *          description: Paciente updated
 *        "201":
 *          description: ok!
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { id_propietario } = body;
  if ((await getPropietario(id_propietario)) == 0) {
    res.status(400).send({ message: "Error, Propietario not found" });
  } else {
    res.status(201).send(await updatePaciente(id, body));
  }
});

/**
 * @swagger
 * path:
 *  /propietario/{id}:
 *    delete:
 *      summary: obtiene el listado de usuarios
 *      tags: [Propietario]
 *      parameters:
 *      - name: id
 *        in: path
 *        type: string
 *      responses:
 *        "400":
 *          description: Paciente deleted
 *        "201":
 *          description: ok!
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await deletePaciente(id));
});

/**
 * @swagger
 * /:propiedad/:busqueda:
 *  get:
 *      description: Devuelve los pacientens que cumplan con el campo de busqueda en la propiedad seleccionada
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 */
router.get("/:propiedad/:busqueda", async (req, res) => {
  const { propiedad, busqueda } = req.params;
  res.status(200).send(await getPacientes(propiedad, busqueda));
});

module.exports = router;
