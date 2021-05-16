const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        name: {type: String},
        startTime: { type: Date },
        endTime: { type: Date },
        address: {type: String},
        client_id: {
            type: Schema.Types.ObjectId, 
            ref: 'client',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('project', Project)