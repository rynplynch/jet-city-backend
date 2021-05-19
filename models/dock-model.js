const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Dock = new Schema(
    {
        usb_c: {type: Boolean},
        proprietary: {type: Boolean},
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

module.exports = mongoose.model('dock', Dock)