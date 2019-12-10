const express = require("express");
const propietarioRoutes = require("./src/routes/propietario");
const pacienteRoutes = require("./src/routes/paciente.routes");
const propietarioRegistrar = require("./src/routes/propietarioRegistrar");

const app = express();

app.use(express.json());
app.use("/propietarios", propietarioRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/propietarioRegistrar", propietarioRegistrar);

app.listen(3000, function() {
  console.log("Server runing on port 3000");
});
