const mongoose = require('mongoose')

// var dbport = process.env.MONGODB_SERVICE_SERVICE_PORT
// var dbhost = process.env.MONGODB_SERVICE_SERVICE_HOST
// var dbpassword = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD
// var dbuser = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME
// console.log(dbport)
// console.log(dbhost)
// console.log(dbpassword)
// console.log(dbuser)

// const string = `mongodb://${dbuser}:${dbpassword}@${dbhost}:${dbport}/jet-city?authSource=admin`
// console.log(string)
const string = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb'
mongoose
    .connect(string,
     { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db