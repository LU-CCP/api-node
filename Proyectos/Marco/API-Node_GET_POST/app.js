const express = require("express");
const propietarioRouters = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");
const propietarioRegistrar = require("./src/routes/propietarioRegistrar.routes");
const citaRegistrar = require("./src/routes/agendarCita");
const app = express();

app.use(express.json());
app.use("/propietario", propietarioRouters);
app.use("/paciente", pacienteRoutes);
app.use("/registrarpropietario", propietarioRegistrar);
app.use("/registrarcita", citaRegistrar);

app.listen(3004, function() {
  console.log("Omar hacked you");
});
