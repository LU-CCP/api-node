const express = require('express');
const propietariosRoutes = require('./src/routes/pripietario.routes');
const pacienteRoutes = require('./src/routes/pacientes.routes');

const app = express();
app.use(express.json());

app.use('/propietario', propietariosRoutes);
app.use('/pacientes', pacienteRoutes);
//app.use('/propietario', propietariosRoutes);

app.listen(3011, function() {
  console.log('corriendo!!');
});
