const Item = require('../models/dock-model')
const Workstation = require('../models/workstation-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body
        if (await Workstation.exists(mongoose.Types.ObjectId(body.workstation_id))){
            const newItem = await Item.create({       
                usb_c: `${body.usb_c}`,
                proprietary: `${body.proprietary}`,
                power: `${body.power}`,
                patch_cable: `${body.patch_cable}`,
                jack_number: `${body.jack_number}`,
                asset: `${body.asset}`,
                decommission: `${body.decommission}`,
                workstation_id: body.workstation_id
            })
            return res.status(200).json({
                success: true,
                item: newItem,
                message: 'Item created!',
            })
        }
        else return res.status(404).json({
            message: 'Workstation not found!',
        })
    } catch (err) {
        next(err);
    }
}
update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }
        if (!item){
            return res.status(404).json({
                success: false,
                error: 'Item not found!',
            })
        }
        item.usb_c = body.usb_c
        item.proprietary = body.proprietary
        item.power = body.power
        item.patch_cable = body.patch_cable
        item.jack_number = body.jack_number
        item.asset = body.asset
        item.decommission = body.decommission
        item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: item._id,
                    message: 'Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Item not updated!',
                })
            })
    })
}
remove = async (req, res) => {

    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}
getAll = async (req, res) => {
    await Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `Items not found` })
        }
        return res.status(200).json({ success: true, data: items })
    }).catch(err => console.log(err))
}
find = async (req, res) => {
    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}
findByWorkstation  = async (req, res) => {
    await Item.find({ workstation_id: req.params.id }, (err,item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (item.length==0) {
            return res
                .status(404)
                .json({ success: false, error: `No item found for workstation` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    find,
    findByWorkstation
}