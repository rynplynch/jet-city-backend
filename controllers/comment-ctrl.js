const Item = require('../models/comment-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body;
        const input = req.params.id 
        const newItem = await Item.create({
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

    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }
        item.comment = body.comment
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