const Task = require('../models/Task');

async function getAllTasks(req, res) {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
    catch(err){
        res.status(500).json({msg: "NOT WORKING BRO"})
    }
}

const createTasks = async (req, res) => {
    try{
        const t = await Task.create(req.body)
        res.status(201).json({ t });
    }
    catch(err){
        res.status(500).json({msg: err});
    }
}

const getTasks = async (req, res) => {
    try {
        // const taskID = req.params.id; this and the line below do the same thing of putting the id value into a variable
        // const {id : taskID} = req.params;
        const task = await Task.findOne({_id: req.params.id});
        if(!task){
            return res.status(404).json({msg : `Task not found with id : ${req.params.id}`})
        }
        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json({msg: err});
    }
}

const updateTasks = async (req, res) => {
    try {
        const id = req.params.id;
        const TaskBody = req.body;
        const task = await Task.findOneAndUpdate({_id: id}, TaskBody, {
            new: true,
            runValidators: true
        });

        if(!task){
            res.status(404).json({msg: "Task not found"})
        }
        res.status(200).json({msg : "Updated successfully"})
    }
    catch(err){
        res.status(500).json({msg: err});
    }
}

const deleteTasks = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id});
        if(!task){
            res.status(404).json({msg: "Task not found"})
        }
        res.status(200).json({msg : "Successfully deleted"})
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}