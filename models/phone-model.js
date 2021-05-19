const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Phone = new Schema(
    {
        power: {type: Boolean},
        patch_cable_in: {type: Boolean},
        patch_cable_out: {type: Boolean},
        jack_number: {type: String},
        decommission: {type: Boolean},
        workstation_id: {
            type: Schema.Types.ObjectId, 
            ref: 'workstation',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('phone', Phone)