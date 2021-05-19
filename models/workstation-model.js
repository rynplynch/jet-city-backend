const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Workstation = new Schema(
    {
        name: {type: String},
        origin: { type: String },
        destination: { type: String },
        flag: { type: Boolean},
        project_id: {
            type: Schema.Types.ObjectId, 
            ref: 'project',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('workstation', Workstation)