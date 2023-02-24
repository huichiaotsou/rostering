import config from "../../config/config.js";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  database: config.database.name,
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  connectionLimit: config.database.maxOpenConnections,
});

// executeQuery executes the sql query with the given stmt and values, along with error handling
// returns result if success
// returns empty array if fail or no result
const executeQuery = async (stmt, values) => {
  let result = [];

  const conn = await pool.getConnection();
  try {
    result = await conn.query(stmt, values);
  } catch (err) {
    console.error(err);
    conn.rollback();
    result = [];
  } finally {
    conn.release();
  }

  return result;
};

const Db = {
  pool,
  executeQuery,
};

export default Db;
