const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const getConsultCitaId = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config); //
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM cita WHERE id = @id");
    sql.close(); // cerramos la conección
    if (result.rowsAffected > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getConsultaCita = async params => {
  const { fecha, medico, propietario } = params;

  let result = await conn
    .request()
    .query("SELECT * FROM cita where (@fecha is null or @fecha > cita.fecha)");
};

module.exports = { getConsultCitaId };
