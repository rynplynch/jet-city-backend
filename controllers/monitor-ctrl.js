const Monitor = require('../models/monitor-model')
const Workstation = require('../models/workstation-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body;
        const input = req.params.id 
        const newMonitor = await Monitor.create({
            size:`${body.size}`,
            power:`${body.power}`,
            video:`${body.video}`,
            asset:`${body.asset}`,
            workstation_id: body.workstation_id
        })
        res.send(newMonitor);
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

    Monitor.findOne({ _id: req.params.id }, (err, monitor) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Monitor not found!',
            })
        }
        monitor.size = body.size
        monitor.power = body.power
        monitor.video = body.video
        monitor.asset = body.asset
        monitor.workstation_id = body.workstation_id
        monitor
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: monitor._id,
                    message: 'Monitor updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Monitor not updated!',
                })
            })
    })
}
remove = async (req, res) => {

    await Monitor.findOneAndDelete({ _id: req.params.id }, (err, monitor) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!monitor) {
            return res
                .status(404)
                .json({ success: false, error: `Monitor not found` })
        }
        return res.status(200).json({ success: true, data: monitor })
    }).catch(err => console.log(err))
}
getAll = async (req, res) => {
    await Monitor.find({}, (err, monitors) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!monitors.length) {
            return res
                .status(404)
                .json({ success: false, error: `Monitors not found` })
        }
        return res.status(200).json({ success: true, data: monitors })
    }).catch(err => console.log(err))
}
find = async (req, res) => {
    await Monitor.findOne({ _id: req.params.id }, (err, monitor) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!monitor) {
            return res
                .status(404)
                .json({ success: false, error: `Monitor not found` })
        }
        return res.status(200).json({ success: true, data: monitor })
    }).catch(err => console.log(err))
}
findByWorkstation  = async (req, res) => {
    await Monitor.find({ workstation_id: req.params.id }, (err, monitor) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!monitor) {
            return res
                .status(404)
                .json({ success: false, error: `No monitor found for workstation` })
        }
        return res.status(200).json({ success: true, data: monitor })
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