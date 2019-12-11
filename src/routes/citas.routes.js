const express = require("express");
const sql = require("mssql");
const router = express.Router();
const dbConfig = require("../mssqlConfig");
const server = express();
server.use(express.json());

router.post("/", function(req, res) {
  console.log(req.body);

  const { id_paciente, motivo_consulta, id_medico, monto } = req.body;

  sql.connect(dbConfig.config, function(err) {
    if (err) console.log(err);
    const sqlRequest = new sql.Request();

    sqlRequest.input("id_paciente", id_paciente);
    sqlRequest.input("id_medico", id_medico);
    sqlRequest.input("motivo_consulta", motivo_consulta);
    sqlRequest.input("monto", monto);

    sqlRequest.query(
      "SELECT pa.id, mv.id From paciente as pa, medico_veterinario as mv Where pa.id = @id_paciente AND mv.id = @id_medico",
      function(err, data) {
        console.log("datos", data);
        if (data.recordset[0].length == 0) {
          res.send("Datos inconclusos");
        } else {
          sqlRequest.query(
            "INSERT INTO cita values(getDate(), @id_paciente,@motivo_consulta, @id_medico, @monto)"
          ),
            function(error, data) {
              if (error) console.log(error);
              res.send("IMPLEMENTADO CON EXITO");
              sql.close();
            };
        }
      }
    );
  });
});

module.exports = router;
