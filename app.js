<<<<<<< HEAD
const express = require("express");
const propietarioRoutes = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
=======
require('dotenv').config();
const express = require('express');
const swaggerConfig = require('./src/swaggerConfig');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const propietarioRoutes = require('./src/routes/propietario.routes');
const pacienteRoutes = require('./src/routes/paciente.routes');
const { API_PORT } = process.env;
>>>>>>> master

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerConfig.config);

<<<<<<< HEAD
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "LU API",
      description: "API Creada por LU",
      servers: ["http://localhost:3000"]
    }
  },
  apis: [`${process.cwd()}/src/routes/*.js`]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use("/propietario", propietarioRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
app.get("/test", function(req, res) {
  res.send("test");
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});

module.exports = app;
=======
//Middleware
app.use(express.json());

//Routes
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/propietario', propietarioRoutes);
app.use('/paciente', pacienteRoutes);

app.listen(API_PORT, function () {
    console.log('Server running on port', API_PORT);
})

module.exports = app;
>>>>>>> master
