const pool = require('../db/index')

<<<<<<< HEAD
create = async (req, res, next) =>{
    try {
        const body = req.body
        const newClient = await Client.create({
            name:`${body.name}`
        })
        console.log(body)
        res.send(newClient);
    } catch (err) {
        next(err);
    }
=======
create = async (req, res) =>{
    const { name } = req.body

    pool.query('INSERT INTO clients (name) VALUES ($1) RETURNING *', [name], ( error,results ) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
>>>>>>> postsql
}

update = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  pool.query(
    'UPDATE clients SET name = $1 WHERE id = $2 RETURNING *',
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

<<<<<<< HEAD
        else return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
=======
  pool.query('DELETE FROM clients WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`client deleted with ID: ${id}`)
  })
>>>>>>> postsql
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
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
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