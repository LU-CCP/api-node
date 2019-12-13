const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

const obtenerCita = async () => {
  let conn = await sql.connect(sqlConfig.config);
  let data = await conn.request().query("select * from cita");
  sql.close();
  return data;
};

const checkCita = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("SELECT * FROM cita WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;

    return false;
  } catch (error) {
    return false;
  }
};

module.exports = { obtenerCita, checkCita };
