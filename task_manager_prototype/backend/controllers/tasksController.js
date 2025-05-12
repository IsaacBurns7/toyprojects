const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1});

    res.status(200).json(tasks);
}

const createTask = async(req, res) => {
    const { title, description, dueDate } = req.body;

    const emptyFields = [];
    const expectedFields = ["title", "description", "dueDate"];

    for(const field of expectedFields){
        if(!req.body[field] || req.body[field].length == 0){
            emptyFields.push(field);
        }
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "please fill in the empty fields", emptyFields});
    }

    try{
        const task = await Task.create({title, description, dueDate});
        res.status(200).json(task);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteTask = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `ID ${id} is not valid. Consult mongoose documentation on valid Object ID format.`})
    }

    const task = await Task.findOneAndDelete({_id: id});

    if(!task){
        return res.status(400).json({error: `Task with ID ${id} not found.`})
    }

    res.status(200).json(task);
}

module.exports = {
    getTasks, 
    createTask,
    deleteTask
}
