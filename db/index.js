const Pool = require("pg").Pool;
const { insert, select, remove, update } = require("./helpers");
//Postgres login credentials pulled from .env file
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASS;
const port = process.env.DB_PORT;
//Helper
const Utils = {};

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

Utils.isObject = (x) => x !== null && typeof x === "object";
Utils.isObjEmpty = (obj) =>
  Utils.isObject(obj) && Object.keys(obj).length === 0;
//module.exports = pool

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();

    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },

  //Updates table
  //Takes in table name (entity), id of row (conditions), and fields- the values to be updated
  //example 'workstation', {id:20}, {name:NEW, destination:UPDATED ...}
  updateOne: async (entity, conditions, fields) => {
    if (!entity) throw new Error("no entity table specified");
    if (Utils.isObjEmpty(conditions))
      throw new Error("no conditions specified");
    if (Utils.isObjEmpty(fields)) throw new Error("no fields specified");

    let resp;
    const { text, values } = update(entity, conditions, fields);

    try {
      rs = await pool.query(text, values);
      resp = rs.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }

    return resp;
  },

  //Create a new row in a table
  //Take the table name and columns of tables
  //example 'workstations', {name:Billy, origin:535, destination:200 ...}
  createOne: async (entity, fields) => {
    if (!entity) throw new Error("no entity table specified");

    let resp;
    const { text, values } = insert(entity, fields);

    try {
      rs = await pool.query(text, values);
      resp = rs.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }

    return resp;
  },

  //Delete one or many from table
  //Take the table name, a single field, and an array of values that will be deleted
  //If any of those values are found in the field specified the entire row will be deleted
  //example 'workstations', [20, 21, 50, ...], 'id'
  deleteOneOrMany: async (entity, conditions, field) => {
    if (!entity) throw new Error("no entity table specified");

    let resp;
    const { text } = remove(entity, conditions, field);

    try {
      rs = await pool.query(text);
      resp = rs.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }

    return resp;
  },

  //Find selection based upon table name, conditions, and column desired
  //example 'workstations', {id:1}, column = [name, origin ...] (or undefined for all columns)
  findSelection: async (entity, conditions, column) => {
    if (!entity) throw new Error("no entity table specified");

    let resp;
    const { text, values } = select(entity, conditions, column);

    try {
      rs = await pool.query(text, values);
      resp = rs.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }

    return resp;
  },

  // ... other methods
};
