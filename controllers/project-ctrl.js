const db = require('../db')

create = async (req, res) =>{
  try {
    console.log("[POST] {api/v1/project}");
    const fields = {
      name: req.body.name,
      client_id: req.body.client_id
    };

    const createProject = await db.createOne("Projects", fields);

    if (createProject) {
      console.log(`Project with id ${createProject.id} created successfully`);
      return res.json(createProject);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

update = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/project}");

    const fields = {
      name: req.body.name
    };
    const userId = req.params.id;
    const conditions = { id: userId };

    const updatedProject = await db.updateOne("Projects", conditions, fields);

    if (updatedProject) {
      console.log(`Project with id ${updatedProject.id} updated successfully`);
      return res.json(updatedProject);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

remove = async (req, res) => {
  try {
    console.log("[DELETE] {api/v1/Project}");
    
    
    const field = Object.keys(req.body);
    //body.id is expected to be an array
    const conditions = req.body.id;
    const deleteProjects = await db.deleteOneOrMany("Projects", conditions, field);

    if (deleteProjects) {
      console.log(`Project with ids ${conditions} deleted successfully`);
      return res.json(deleteProjects);
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

    console.log(`[GET] {api/v1/project/${userId}}`);

    const column = req.body.column;
    const conditions = {id: userId} ;

    const findProject = await db.findSelection("Projects", conditions, column);

    if (findProject) {
      console.log(`Project with id ${userId} found successfully`);
      return res.json(findProject);
    }
    res.status(404).json({ msg: "Bad request" });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}

findByClient = async (req, res) => {
  try {
    const client_id = req.params.id;
    const column = req.body.column;
    const conditions = { client_id: client_id };

    console.log(`[GET] {api/v1/client/project/${client_id}}`);

    const findproject = await db.findSelection("projects", conditions, column);

    if (findproject) {
      console.log(`project with client_id ${client_id} found successfully`);
      return res.json(findproject);
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
    const findproject = await db.findSelection("projects", conditions, column);
    console.log(`[GET] {api/v1/project}`);

    if (findproject) {
      console.log(`projects found successfully`);
      return res.json(findproject);
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
    findById,
    findByClient
}