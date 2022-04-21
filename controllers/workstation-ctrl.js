const db = require("../db");

create = async (req, res) => {
  try {
    console.log("[POST] {api/v1/workstation}");
    const fields = {
      name: req.body.name,
      project_id: req.body.project_id,
      origin: req.body.origin,
      destination: req.body.destination,
      monitors: req.body.monitors,
      docking_stations: req.body.docking_stations,
      computers: req.body.computers,
      keyboards: req.body.keyboards,
      mice: req.body.mice,
    };

    const createWorkstation = await db.createOne("workstations", fields);

    if (createWorkstation) {
      console.log(
        `Workstation with id ${createWorkstation.id} created successfully`
      );
      return res.json(createWorkstation);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

update = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/workstation}");

    const fields = {
      project_id: req.body.project_id,
      name: req.body.name,
      origin: req.body.origin,
      destination: req.body.destination,
      monitors: req.body.monitors,
      docking_stations: req.body.docking_stations,
      computers: req.body.computers,
      keyboards: req.body.keyboards,
      mice: req.body.mice,
    };
    const userId = req.params.id;
    const conditions = { id: userId };

    const updatedWorkstation = await db.updateOne(
      "workstations",
      conditions,
      fields
    );

    if (updatedWorkstation) {
      console.log(
        `Workstation with id ${updatedWorkstation.id} updated successfully`
      );
      return res.json(updatedWorkstation);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

remove = async (req, res) => {
  try {
    console.log("[DELETE] {api/v1/workstation}");

    const field = Object.keys(req.body);
    //body.id is expected to be an array
    const conditions = req.body.id;
    const deleteWorkstations = await db.deleteOneOrMany(
      "workstations",
      conditions,
      field
    );

    if (deleteWorkstations) {
      console.log(`Workstation with ids ${conditions} deleted successfully`);
      return res.json(deleteWorkstations);
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

    console.log(`[GET] {api/v1/workstation/${userId}}`);

    const column = req.body.column;
    const conditions = { id: userId };

    const findWorkstation = await db.findSelection(
      "workstations",
      conditions,
      column
    );

    if (findWorkstation) {
      console.log(`Workstation with id ${userId} found successfully`);
      return res.json(findWorkstation);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

findByProject = async (req, res) => {
  try {
    const project_id = req.params.id;

    console.log(`[GET] {api/v1/project/workstation/${project_id}}`);

    const column = req.body.column;
    const conditions = { project_id: project_id };

    const findWorkstation = await db.findSelection(
      "workstations",
      conditions,
      column
    );

    if (findWorkstation) {
      console.log(
        `Workstation with project_id ${project_id} found successfully`
      );
      return res.json(findWorkstation);
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
    const findWorkstation = await db.findSelection(
      "workstations",
      conditions,
      column
    );
    console.log(`[GET] {api/v1/workstation}`);

    if (findWorkstation) {
      console.log(`Workstations found successfully`);
      return res.json(findWorkstation);
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
  findByProject,
};
