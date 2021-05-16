const Client = require('../models/client-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body
        const newClient = await Client.create({
            name:`${body.name}`
        })
        res.send(newClient);
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

    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Client not found!',
            })
        }
        client.name = body.name
        client
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: client._id,
                    message: 'Client updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Client not updated!',
                })
            })
    })
}
remove = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}
find = async (req, res) => {
    await Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}
getAll = async (req, res) => {
    await Client.find({}, (err, client) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!client.length) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    find
}