const taskDB = require('../model/taskModel');
const mongoose = require('mongoose');

//create and save new task
exports.create = async (req, res) => {
    const {taskName, taskDescription, taskTime, taskPriority, taskStat} = req.body;
    const taskUser = req.user._id;

    try{
        const newTask = await taskDB.create({taskUser, taskName, taskDescription, taskTime, taskPriority, taskStat});
        res.status(200).json({
            message:"Task added successfully",
            data : newTask
        });
    }
    catch(err){
        res.status(400).json({error: err.message});
    };
}

//retrieve and return all tasks
exports.getTask = async (req, res) => {
    const taskUser = req.user.id;

    try{
        const task = await taskDB.find({taskUser}).sort({createdAt:-1}).exec();

        if(!task){
            return res.status(404).json({error: 'No such tasks'});
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

//find by id
exports.findById = async(req,res)=>{
    const id = mongoose.Types.ObjectId(req.params.id);
    const taskUser=req.user._id;

    try{
        const task = await taskDB.find({taskUSer}).findOne({_id: id}).exec();
        if(!task){
            return res.status(404).json({error: 'No such task'});
        }
        res.status(200).json(task)
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
}

//update a new task by id
exports.update = async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = mongoose.Types.ObjectId(req.params.id);

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such task'});
        }

        const task = await taskDB.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if(!task){
            return res.status(404).json({error: 'No such task'});
        }

        res.status(200).json({
            message:"Task updated successfully",
            data: task
        })
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

//delete task
exports.delete = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such task'});
        }
        const task = await taskDB.findOneAndDelete({_id: id}).exec();
        if(!task){
            return res.status(404).json({error: 'No such task'});
        }
        res.status(200).json({
            message:"Task deleted successfully",
            data: task
        });
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

//sorting API
exports.sort = async (req, res) => {

}

//filtering API
exports.filtering = async (req, res) => {
    try {
        const filters = req.query;
        const todos = await taskDB.find({});

        const filteredTodo = todos.filter(data => {
            let isValid = true;
            for (key in filters) {
                console.log(key, data[key], filters[key]);
                isValid = isValid && data[key] == filters[key];
            }
            return isValid;
        })

        res.status(200).json(filteredTodo);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}