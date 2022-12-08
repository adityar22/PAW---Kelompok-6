const taskDB = require('../model/taskModel');
const mongoose = require('mongoose');

//create and save new task
exports.create = async (req, res, next) => {
    const { taskName, taskDescription, taskTime, taskPriority, taskStat } = req.body;
    const taskUser = req.user._id;

    try {
        const newTask = await taskDB.create({ taskUser, taskName, taskDescription, taskTime, taskPriority, taskStat });
        res.status(200).json({
            success: true,
            message: 'New task added succesfully!',
            data: newTask
        });
    }
    catch (err) {
        next(err);
    };
}

//retrieve and return all tasks
exports.getTask = async (req, res, next) => {
    const taskUser = req.user.id;

    try {
        const task = await taskDB.find({ taskUser }).sort({ taskTime: -1 }).exec();

        if (!task) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Task is empty',
            };
        }

        res.status(200).json({
            success: true,
            message: 'Your all tasks is found!',
            data: task
        });
    }
    catch (err) {
        next(err);
    }
}

//find by id
exports.findById = async (req, res, next) => {

    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your task id is not valid',
              };
        }

        const taskUser = req.user._id;
        const task = await taskDB.find({ taskUser }).findOne({ _id: id }).exec();
        if (!task) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Task is not found',
            };
        }
        
        res.status(200).json({
            success: true,
            message: 'Your task is found!',
            data: task
        });
    }
    catch (err) {
        next(err);
    }
}

//update a new task by id
exports.update = async (req, res, next) => {
    if (!req.body) {
        throw {
            success: false,
            statusCode: 404,
            message: 'Your data to update is empty',
          };
    }
    
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your task id is not valid',
              };
        }

        const task = await taskDB.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if (!task) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Task is empty',
              };
        }

        res.status(200).json({
            success: true,
            message: 'Task updated succesfully!',
            data: task
        });
    }
    catch (err) {
        next(err);
    }
}

//delete task
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your task id is not valid',
              };
        }
        const task = await taskDB.findOneAndDelete({ _id: id }).exec();
        if (!task) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Task is empty',
              };
        }

        res.status(200).json({
            success: true,
            message: 'Task updated succesfully!',
            data: task
        });
    }
    catch (err) {
        next(err);
    }
}

//filtering API
exports.filtering = async (req, res, next) => {
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

        res.status(200).json({
            success: true,
            message: 'Task is found!',
            data: filteredTodo
        });
    }
    catch (err) {
        next(err);
    }
}