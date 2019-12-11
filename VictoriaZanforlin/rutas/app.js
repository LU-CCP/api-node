const express = require("express"); // 2 aaplicaciones: ruteo/ generacion rutas y conjunto de clases q van a interactuar con la ruta
const propietarioRoutes = require("./src/routes/propietario.routes");
const pacienteRoutes = require("./src/routes/paciente.routes");
const citaRoutes = require("./src/routes/cita.routes");

const app = express();

app.use(express.json());
app.use("/propietario", propietarioRoutes);
app.use("/paciente", pacienteRoutes); // todas las rutas en paciente.routes.js van a empezar con /paciente/
app.use("/cita", citaRoutes);

app.listen(3005, function() {
  console.log("Server running on port 3005");
});
