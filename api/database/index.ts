import initDb from "./init";
import insertOrUpdate from "./insertOrUpdate";
const connection = require("./db");

export default {
  insertOrUpdate,
  initDb,
  connection,
};
