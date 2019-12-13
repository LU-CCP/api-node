const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

//Interactuando con la bd

// Obtener listado de pacientes, filtrando por sus propiedades principales
// Obtener los datos de un paciente dado su id

async function obtenerPacientesParams(id_cita) {
  try {
    const conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id_cita", sql.Int, id_cita)
      .query("select * from diagnostico where id_cita=@id_cita");
    sql.close();
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function obtenerPacientesId(id) {
  try {
    const conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.Int, id)
      .query("select * from diagnostico where id=@id");
    sql.close();
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
}

const agregar = async body => {
  const { id_cita, descripcion } = body;

  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id_cita", id_cita)
    .input("descripcion", descripcion)
    .query("INSERT INTO diagnostico VALUES(@id_cita, @descripcion)");

  connect.close();

  return results;
};

const editar = async (id, body) => {
  const { id_cita, descripcion } = body;

  const connect = await sql.connect(sqlConfig.config);
  const editar = await connect
    .request()
    .input("id", id)
    .input("id_cita", id_cita)
    .input("descripcion", descripcion)
    .query(
      "UPDATE diagnostico SET id_cita = @id_cita, descripcion = @descripcion WHERE diagnostico.id = @id"
    );

  connect.close();

  return editar;
};

const eliminar = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const eliminar = await connect
    .request()
    .input("id", id)
    .query("DELETE FROM diagnostico WHERE diagnostico.id = @id");

  connect.close();

  return eliminar;
};

const encontrarIdCita = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id", id)
    .query("SELECT c.id FROM cita c WHERE c.id = @id");

  connect.close();

  return results.recordset[0].length != 0;
};

const encontrarIdDiagnostico = async id => {
  const connect = await sql.connect(sqlConfig.config);
  const results = await connect
    .request()
    .input("id", id)
    .query("SELECT d.id FROM diagnostico d WHERE d.id = @id");

  connect.close();

  console.log(results);

  return results.recordset[0].length != 0;
};

module.exports = {
  agregar,
  editar,
  eliminar,
  encontrarIdCita,
  encontrarIdDiagnostico,
  obtenerPacientesParams,
  obtenerPacientesId
};
