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

module.exports = {
    getTasks, 
    createTask
}
