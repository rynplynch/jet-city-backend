const Pool = require('pg').Pool
const { insert, select, remove, update } = require("./helpers");
//Postgres login credentials pulled from .env file
const user = process.env.DB_USER
const host = process.env.DB_HOST
const database = process.env.DB_NAME
const password = process.env.DB_PASS
const port = process.env.DB_PORT

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
})
const Utils = {};
Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;
module.exports = pool

/**
 * The main mechanism to avoid SQL Injection is by escaping the input parameters.
 * Any good SQL library should have a way to achieve this.
 * PG library allows you to do this by placeholders `($1, $2)`
 */
 module.exports = {
    
    query: (text, params, callback) => {
      const start = Date.now();
  
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log("executed query", { text, duration, rows: res.rowCount });
        callback(err, res);
      });
    },
  
    getClient: callback => {
        pool.connect((err, client, done) => {
        const query = client.query;
        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args;
            return query.apply(client, args);
        };
        // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error("A client has been checked out for more than 5 seconds!");
            console.error(
                `The last executed query on this client was: ${client.lastQuery}`
            );
        }, 5000);
        const release = err => {
            // call the actual 'done' method, returning this client to the pool
            done(err);
            // clear our timeout
            clearTimeout(timeout);
            // set the query method back to its old un-monkey-patched version
            client.query = query;
        };
        callback(err, client, release);
        });
    },
  
    /**
     * Updates data
     *
     * entity: table name, e.g, users 
     * conditions: { id: "some-unique-user-id", ... }
     * fields: list of desired columns to update { username: "Joe", ... }
     */
    updateOne: async (entity, conditions, fields) => {
        if (!entity) throw new Error("no entity table specified");
        if (Utils.isObjEmpty(conditions))
            throw new Error("no conditions specified");

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
  
    deleteOne: async (entity, conditions, data) => {
    },
  
    findAll: async (entity, conditions, fields) => {
        if (!entity) throw new Error("no entity table specified");
        if (Utils.isObjEmpty(conditions))
            throw new Error("no conditions specified");
    
    },
  
    // ... other methods
  };