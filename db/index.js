const Pool = require('pg').Pool

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

module.exports = pool