const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema(
    {
        comment: {type: String},
        workstation_id: {
            type: Schema.Types.ObjectId, 
            ref: 'workstation',
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('comment', Comment)