const pool = require('../db/index')

create = async (req, res) =>{
    const { name, client_id } = req.body

    pool.query('INSERT INTO projects (name, client_id) VALUES ($1, $2) RETURNING *', [name, client_id], ( error,results ) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
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
      res.status(200).json(results.rows)
    }
  )
}

remove = async (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

find = async (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM projects WHERE id = $1', [id], (error, results) => {
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

findByClient = async (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM projects WHERE client_id = $1', [id], (error, results) => {
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
    findByClient
}