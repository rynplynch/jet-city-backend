const express = require('express')
const cors = require('cors')
require('dotenv').config()

//importing routes for objects
const userRouter = require('./routes/user-router')
const clientRouter = require('./routes/client-router')
const projectRouter = require('./routes/project-router')

const app = express()
const apiPort = process.env.BE_PORT

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, and Postgres API'})
})

app.use('/api',
userRouter,
clientRouter,
projectRouter
)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))