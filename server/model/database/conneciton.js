import config from "../../../config/config.js";
import { promisify } from "util";
import mysql from "mysql";

const dbCfg = config.database;

let conn = mysql.createConnection({
  database: dbCfg.name,
  host: dbCfg.host,
  user: dbCfg.user,
  password: dbCfg.password,
});

let promiseTransaction = promisify(conn.beginTransaction).bind(conn);
let promiseQuery = promisify(conn.query).bind(conn);
let promiseCommit = promisify(conn.commit).bind(conn);
let promiseRollback = promisify(conn.rollback).bind(conn);

const db = {
  Tx: promiseTransaction,
  Query: promiseQuery,
  Commit: promiseCommit,
  Rollback: promiseRollback,
};

export default db;
