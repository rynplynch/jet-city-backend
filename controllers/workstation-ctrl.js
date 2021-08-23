const db = require('../db')
const pool = require('../db')


create = async (req, res) =>{
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
      mice: req.body.mice
    };

    const createWorkstation = await db.createOne("workstations", fields);

    if (createWorkstation) {
      console.log(`team ${createWorkstation.name} created successfully`);
      return res.json(createWorkstation);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
}
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
      mice: req.body.mice
    };
    const userId = req.params.id;

    const conditions = { id: userId };
    const updatedWorkstation = await db.updateOne("workstations", conditions, fields);

    if (updatedWorkstation) {
      console.log(`team ${updatedWorkstation.name} updated successfully`);
      return res.json(updatedWorkstation);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

remove = async (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM workstations WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(500).error
      throw error
    }
    res.status(200).json(results.rows)
  })
}

find = async (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM workstations WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

getAll = async (req, res) => {
    pool.query('SELECT * FROM workstations ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

findByProject = async (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM workstations WHERE project_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    find,
    findByProject
}