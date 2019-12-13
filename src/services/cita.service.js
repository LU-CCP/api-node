const sql = require("mssql");
const sqlConfig = require("../mssqlConfig");

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

const deleteCita = async id => {
  try {
    let conn = await sql.connect(sqlConfig.config);
    let result1 = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("DELETE FROM diagnostico WHERE id_cita = @id");
    let result = await conn
      .request()
      .input("id", sql.BigInt, id)
      .query("DELETE FROM cita WHERE id = @id");
    sql.close();
    if (result.rowsAffected > 0) return result;
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = { checkCita, deleteCita };
