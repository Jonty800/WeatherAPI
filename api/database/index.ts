import initDatabase from "./init";
import insertOrUpdate from "./insert-update";
const connection = require("./database");

export default {
  insertOrUpdate,
  initDatabase,
  connection,
};
