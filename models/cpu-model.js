const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CPU = new Schema(
    {
        power: {type: Boolean},
        patch_cable: {type: Boolean},
        jack_number: {type: String},
        asset: {type: String},
        decommission: {type: Boolean},
        workstation_id: {
            type: Schema.Types.ObjectId, 
            ref: 'workstation',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('cpu', CPU)