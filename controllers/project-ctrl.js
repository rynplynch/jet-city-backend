const Project = require('../models/project-model')
var mongoose = require('mongoose');

create = async (req, res, next) =>{
    try {
        const body = req.body
        const newProject = await Project.create({
            name:`${body.name}`,
            startTime:`${body.startTime}`,
            endTime:`${body.endTime}`,
            address:`${body.address}`,
            client_id: body.client_id
        })
        res.send(newProject);
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

    Project.findOne({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }
        project.name = body.name
        project.startTime = body.startTime
        project.endTime = body.endTime
        project.address = body.address
        project
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: project._id,
                    message: 'Project updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Project not updated!',
                })
            })
    })
}
remove = async (req, res) => {
    await Project.findOneAndDelete({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }

        else return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}
find = async (req, res) => {
    await Project.findOne({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}
getAll = async (req, res) => {
    await Project.find({}, (err, projects) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `Projects not found` })
        }
        return res.status(200).json({ success: true, data: projects })
    }).catch(err => console.log(err))
}
findByClient  = async (req, res) => {
    await Project.find({ client_id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `No projects found for client` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}


module.exports = {
    create,
    update,
    remove,
    getAll,
    find,
    findByClient
}