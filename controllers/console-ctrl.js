const Console = require('../models/console-model')
const Workstation = require('../models/workstation-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body;
        const input = req.params.id 
        const newItem = await Console.create({
            comment:`${body.comment}`,
            workstation_id: body.workstation_id
        })
        res.send(newItem);
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

    Console.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }
        item.comment = body.comment
        item.workstation_id = body.workstation_id
        item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
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

    await Console.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: monitor })
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
    await Console.findOne({ _id: req.params.id }, (err, item) => {
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
    await Console.find({ workstation_id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
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