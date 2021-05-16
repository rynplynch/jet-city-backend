const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Monitor = new Schema(
    {
        size: {type: String},
        power: {type: Boolean},
        video: {type: String},
        asset: {type: String},
        workstation_id: {
            type: Schema.Types.ObjectId, 
            ref: 'workstation',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('monitor', Monitor)