const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    
    res.status(200).json(workouts);
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `ID ${id} is not valid. Consult mongoose documentation on valid Object IDs.`})
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: `Workout with ID ${id} not found.`})
    }

    res.status(200).json(workout);
}

//create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    try{
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `ID ${id} is not valid. Consult mongoose documentation on valid Object IDs.`})
    }

    try{
        const workout = await Workout.deleteOne({_id: id});
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `ID ${id} is not valid. Consult mongoose documentation on valid Object IDs.`})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!workout){
        return res.status(404).json({error: `Workout with ID ${id} not found.`})
    }

    return res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}