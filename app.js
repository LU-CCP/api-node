require('dotenv').config();
const express = require('express');
const swaggerConfig = require('./src/swaggerConfig');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const propietarioRoutes = require('./src/routes/propietario.routes');
const pacienteRoutes = require('./src/routes/paciente.routes');
const { API_PORT } = process.env;

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerConfig.config);

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