/*
 * Entry point for our rest api.
 * We import our enviroment variables and the router that define our api.
 */

import express from "express";
import cors from "cors";

//import our enviroment variables
//.config() acutally loads in our variable
import dotenv from "dotenv";
dotenv.config();

//importing routes
import user from "./controllers/orm-user-ctrl.js";

//set app as our express server
//We use our enviroment variable to set port number
const app = express();
const apiPort = process.env.BE_PORT;

//Configure our app to allow CORS and accept json data.
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//Root of our api
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

//Adding routes for our api
app.get("/users", user.readAll);
app.post("/users", user.writeOne);
//Set the app to listen
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

//export our app for testing
export default app;
