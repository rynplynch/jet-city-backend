const db = require("../db");

create = async (req, res) => {
  try {
    console.log("[POST] {api/v1/client}");
    const fields = {
      name: req.body.name,
    };

    const createClient = await db.createOne("clients", fields);

    if (createClient) {
      console.log(`client with id ${createClient.id} created successfully`);
      return res.json(createClient);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

update = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/client}");

    const fields = {
      name: req.body.name,
    };
    const userId = req.params.id;
    const conditions = { id: userId };

    const updatedClient = await db.updateOne("Clients", conditions, fields);

    if (updatedClient) {
      console.log(`Client with id ${updatedClient.id} updated successfully`);
      return res.json(updatedClient);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

remove = async (req, res) => {
  try {
    console.log("[DELETE] {api/v1/Client}");

    const field = Object.keys(req.body);
    //body.id is expected to be an array
    const conditions = req.body.id;
    const deleteClients = await db.deleteOneOrMany(
      "Clients",
      conditions,
      field
    );

    if (deleteClients) {
      console.log(`Client with ids ${conditions} deleted successfully`);
      return res.json(deleteClients);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

findById = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(`[GET] {api/v1/Client/${userId}}`);

    const column = req.body.column;
    const conditions = { id: userId };

    const findClient = await db.findSelection("Clients", conditions, column);

    if (findClient) {
      console.log(`Client with id ${userId} found successfully`);
      return res.json(findClient);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

findAll = async (req, res) => {
  try {
    const column = req.body.column;
    const conditions = undefined;
    const findClient = await db.findSelection("Clients", conditions, column);
    console.log(`[GET] {api/v1/Client}`);

    if (findClient) {
      console.log(`Clients found successfully`);
      return res.json(findClient);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

module.exports = {
  create,
  update,
  remove,
  findAll,
  findById,
};
