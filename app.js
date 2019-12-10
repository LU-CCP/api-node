const express = require("express");
const propietarioRoutes = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");
const registrarPropietario = require("./src/routes/propietarioRegistrar.routes");

const app = express();

app.use(express.json());
app.use("/propietario", propietarioRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/registrarpropietario", registrarPropietario);

app.listen(3002, function() {
  console.log("Server running on port 3002");
});
