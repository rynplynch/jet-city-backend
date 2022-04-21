import Sequelize from "sequelize";
import db from "../db/orm-db.js";

//Our data model for the table users
const User = db.define("users", {
  first_name: { type: Sequelize.TEXT },
  last_name: { type: Sequelize.TEXT },
  email: { type: Sequelize.TEXT },
});

//Sequelize will create a table for users if it doesnt exist
await User.sync();

//The readAll function returns all rows in our table
User.readAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.send({ users });
  } catch (error) {
    return res.send(error);
  }
};

User.writeOne = async (req, res) => {
  try {
    //If the request doesnt have the user first_name refuse the request
    if (!req.body.first_name) {
      res.status(400).send({
        message: "Content can not be emplty"
      });
    }

    //Retrieve data for new user from request body
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.gmail
    };

    //Create new sequelize object representing new user
    const user = await User.build(userData);

    //add user to table
    user.save();
    return res.status(200).send({ message: "complete" });
  } catch (error) {
    return res.send(error);
  }
};
/*
const testUser = User.build({
  first_name: "Ryan",
  last_name: "Lynch",
  email: "rynplynch@gmail.com"
});
testUser.save().then(() => {
  console.log("User added");
});
*/
export default User;
