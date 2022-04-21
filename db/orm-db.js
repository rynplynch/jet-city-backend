/* We use this file for the configuration of our db object
 * we can then export this and use it when interacting
 * wih our API endpoints
 */

import Sequalize from "sequelize";

//Load enviroment variables
import dotenv from "dotenv";
dotenv.config();

//Pull enviroment variables into local variables
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASS;
const port = process.env.DB_PORT;

//Construct URL string then pass that to sequalize
//this creates our database object
const DATABASE_URL = `postgres://${user}:${password}@${host}:${port}/${database}`;
const db = new Sequalize(DATABASE_URL);

//Used to test database connection
/*db.authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to database:"), err;
  })
  .finally(() => {
    db.close();
  });
*/

//export database object
export default db;
