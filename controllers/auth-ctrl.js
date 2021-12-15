const db = require('../db')

create = async (req, res) =>{
  try {
    console.log("[POST] {api/v1/user}");
    const fields = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };

    const createUser = await db.createOne("users", fields);

    if (createUser) {
      console.log(`user with id ${createUser.id} created successfully`);
      return res.json(createUser);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

update = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/user}");

    const fields = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };
    const userId = req.params.id;
    const conditions = { id: userId };

    const updatedUser = await db.updateOne("Users", conditions, fields);

    if (updatedUser) {
      console.log(`User with id ${updatedUser.id} updated successfully`);
      return res.json(updatedUser);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

remove = async (req, res) => {
  try {
    console.log("[DELETE] {api/v1/User}");


    const field = Object.keys(req.body);
    //body.id is expected to be an array
    const conditions = req.body.id;
    const deleteUsers = await db.deleteOneOrMany("Users", conditions, field);

    if (deleteUsers) {
      console.log(`User with ids ${conditions} deleted successfully`);
      return res.json(deleteUsers);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

findById = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(`[GET] {api/v1/User/${userId}}`);

    const column = req.body.column;
    const conditions = {id: userId} ;

    const findUser = await db.findSelection("Users", conditions, column);

    if (findUser) {
      console.log(`User with id ${userId} found successfully`);
      return res.json(findUser);
    }
    res.status(404).json({ msg: "Bad request" });
  }

  catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

findAll = async (req, res) => {
  try {
    const column = req.body.column;
    const conditions = undefined ;
    const findUser = await db.findSelection("Users", conditions, column);
    console.log(`[GET] {api/v1/User}`);

    if (findUser) {
      console.log(`Users found successfully`);
      return res.json(findUser);
    }
    res.status(404).json({ msg: "Bad request" });
  }

  catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

module.exports = {
    create,
    update,
    remove,
    findAll,
    findById
}
