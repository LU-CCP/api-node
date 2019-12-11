const express = require('express');
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

const router = express.Router();

router.get('/', function(req, res) {
  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.query('select * from Persona', function(error, data) {
      if (error) console.log(error);

      res.send(data);

      sql.close();
    });
  });
});

router.post('/insert', function(req, res) {
  const { body } = req;

  const { rut, nombre, apellido_materno, apellido_paterno, telefono } = body;

  console.log('el rut' + rut);

  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    const q = `INSERT INTO Persona (rut, nombre,apellido_materno,apellido_paterno,telefono) VALUES ('${rut}','${nombre}','${apellido_materno}','${apellido_paterno}','${telefono}')`;
    sqlRequest.query(q);

    sqlRequest.query(q, function(error, data) {
      if (error) console.log(error);

      res.send(data);

      sql.close();
    });
  });
});

router.post('/cita', function(req, res) {
  const { body } = req;

  const { fecha, id_paciente, motivo_consulta, id_medico, monto } = body;

  sql.connect(sqlConfig.config, function(err) {
    if (err) console.log(err);

    const sqlRequest = new sql.Request();

    sqlRequest.input('fecha', fecha);
    sqlRequest.input('id_paciente', id_paciente);
    sqlRequest.input('motivo_consulta', motivo_consulta);
    sqlRequest.input('id_medico', id_medico);
    sqlRequest.input('monto', monto);

    const q =
      'IF EXISTS (SELECT * FROM paciente, medico_veterinario WHERE paciente.id = @id_paciente AND medico_veterinario.id = @id_medico) BEGIN (INSERT INTO cita VALUES (@fecha, @id_paciente, @motivo_consulta, @id_medico, @monto)) END ';

    sqlRequest.query(q, function(error, data) {
      if (error || data.rowsAffected.length == 0) {
        res.statusCode = 400;
        res.send('error, no existe');
        return;
      }

      res.send(data);

      sql.close();
    });
  });
});

module.exports = router;
