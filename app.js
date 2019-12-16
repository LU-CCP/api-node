const express = require("express");
const propietarioRoutes = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");
const diagnosticoRoutes = require("./src/routes/diagnostico.routes");
const swaggerConfig = require("./src/swaggerConfig");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerConfig.config);

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "LU API",
//       description: "API Creada por LU",
//       servers: ["http://localhost:3005"]
//     }
//   },
//   apis: [`${process.cwd()}/src/routes/*.js`]
// };

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

app.listen(3005, function() {
  console.log("Server running on port 3005");
});
//Middleware
app.use(express.json());

//Routes
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/propietario", propietarioRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/diagnostico", diagnosticoRoutes);

// app.listen(API_PORT, function() {
//   console.log("Server running on port", API_PORT);
// });

module.exports = app;
