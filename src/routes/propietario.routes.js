const express = require('express');
const sql = require('mssql');
const sqlConfig = require('../mssqlConfig');

const router = express.Router();

//Crear una ruta que permita registrar un propietario


router.get('/', function (req, res) {
    sql.connect(sqlConfig.config, function (err) {

        if (err) console.log(err);

        const sqlRequest = new sql.Request();

        sqlRequest.query('select * from persona', function (error, data) {

            if (error) console.log(error);

            res.send(data);

            sql.close();
        })
    });

});

module.exports = router;