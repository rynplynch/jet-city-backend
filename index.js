const express = require('express')
const cors = require('cors')

//import Database
const db = require('./db')

//importing object routers
const clientRouter = require('./routes/client-router')
const projectRouter = require('./routes/project-router')
const workstationRouter = require('./routes/workstation-router')
const monitorRouter = require('./routes/monitor-router')
const commentRouter = require('./routes/comment-router')
const cpuRouter = require('./routes/cpu-router')
const dockRouter = require('./routes/dock-router')
const laptopRouter = require('./routes/laptop-router')
const phoneRouter = require('./routes/phone-router')

const app = express()
const apiPort = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', 
clientRouter, 
projectRouter, 
workstationRouter, 
monitorRouter,
commentRouter,
cpuRouter,
dockRouter,
laptopRouter,
phoneRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))