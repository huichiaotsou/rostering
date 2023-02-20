import config from "../../../config/config.js";
import { promisify } from "util";
import mysql from "mysql";

const dbCfg = config.database;

const pool = mysql.createPool({
  connectionLimit: 20,
  database: dbCfg.name,
  host: dbCfg.host,
  user: dbCfg.user,
  password: dbCfg.password,
});

// const conn = mysql.createConnection({
//   database: dbCfg.name,
//   host: dbCfg.host,
//   user: dbCfg.user,
//   password: dbCfg.password,
// });

const db = {
  Query: promisify(pool.query).bind(pool),

  //   BeginTx: promisify(conn.beginTransaction).bind(conn),
  //   Query: promisify(conn.query).bind(conn),
  //   Commit: promisify(conn.commit).bind(conn),
  //   Rollback: promisify(conn.rollback).bind(conn),
};

export default db;
