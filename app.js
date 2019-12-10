const express = require("express");
const propietarioRouters = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");
const registrar = require("./src/routes/propietarioRegistrar.routes");
const app = express();

app.use(express.json());
app.use("/propietario", propietarioRouters);
app.use("/paciente", pacienteRoutes);
app.use("/registrarpropietario", registrar);

app.listen(3010, function() {
  console.log("Omar hacked you");
});
