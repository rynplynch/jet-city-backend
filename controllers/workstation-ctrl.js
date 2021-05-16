const Workstation = require('../models/workstation-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body
        const newWorkstation = await Workstation.create({
            name:`${body.name}`,
            origin:`${body.origin}`,
            destination:`${body.destination}`,
            comments:`${body.comments}`,
            project_id: body.project_id
        })
        res.send(newWorkstation);
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

    Workstation.findOne({ _id: req.params.id }, (err, workstation) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Workstation not found!',
            })
        }
        workstation.name = body.name
        workstation.origin = body.origin
        workstation.destination = body.destination
        workstation.comments = body.comments
        if(typeof workstation.monitors !== "undefined"){
            workstation.monitors.$push(body.monitors)
        }
        workstation
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: workstation._id,
                    message: 'Workstation updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Workstation not updated!',
                })
            })
    })
}
remove = async (req, res) => {
    await Workstation.findOneAndDelete({ _id: req.params.id }, (err, workstation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!workstation) {
            return res
                .status(404)
                .json({ success: false, error: `Workstation not found` })
        }

        return res.status(200).json({ success: true, data: workstation })
    }).catch(err => console.log(err))
}
find = async (req, res) => {
    await Workstation.findOne({ _id: req.params.id }, (err, workstation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!workstation) {
            return res
                .status(404)
                .json({ success: false, error: `Workstation not found` })
        }
        return res.status(200).json({ success: true, data: workstation })
    }).catch(err => console.log(err))
}
getAll = async (req, res) => {
    await Workstation.find({}, (err, workstations) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!workstations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Workstation not found` })
        }
        return res.status(200).json({ success: true, data: workstations })
    }).catch(err => console.log(err))
}
findByProject  = async (req, res) => {
    await Workstation.find({ project_id: req.params.id }, (err, workstation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!workstation) {
            return res
                .status(404)
                .json({ success: false, error: `No workstations found for project` })
        }
        return res.status(200).json({ success: true, data: workstation })
    }).catch(err => console.log(err))
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    find,
    findByProject
}