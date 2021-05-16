const express = require('express')
const cors = require('cors')

const db = require('./db')
const clientRouter = require('./routes/client-router')
const projectRouter = require('./routes/project-router')
const workstationRouter = require('./routes/workstation-router')
const monitorRouter = require('./routes/monitor-router')

const app = express()
const apiPort = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', clientRouter, projectRouter, workstationRouter, monitorRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))