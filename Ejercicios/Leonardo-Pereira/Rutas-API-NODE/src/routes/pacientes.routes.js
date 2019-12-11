const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/', function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query(
      'select paciente.nombre, Persona.nombre from paciente, Persona WHERE paciente.id = Persona.id;',
      function(error, data) {
        if (error) console.log(error);

        res.send(data);

        sql.close();
      }
    );
  });
});

module.exports = router;
