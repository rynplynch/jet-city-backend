const pool = require('../db/index')

create = async (req, res) =>{
    const { name, client_id } = req.body

    pool.query('INSERT INTO projects (name, client_id) VALUES ($1, $2) RETURNING *', [name, client_id], ( error,results ) => {
      if (error) {
        throw error
      }
      res.status(201).json(`Project added with ID: ${results.rows[0].id}`)
    })
}

update = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  pool.query(
    'UPDATE projects SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

remove = async (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

find = async (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM clients WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

getAll = async (req, res) => {
    pool.query('SELECT * FROM projects ORDER BY id ASC', (error, results) => {
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
    find
}