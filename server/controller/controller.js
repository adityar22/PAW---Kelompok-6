var taskDB = require('../model/model');

//create and save new task
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can be empty"});
        return;
    }
    const task = taskDB({
        taskID: req.body.taskID,
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        taskTime: req.body.taskTime,
        taskPriority: req.body.taskPriority,
        taskStat: req.body.taskStat
    });
    
    task
        .save(task)
        .then(data => {res.send(data)})
        .catch(err => {res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        });});
}

//retrieve and return all tasks
exports.find=(req, res)=>{
    
}

//update a new task by id
exports.update=(req, res)=>{
    
}

//delete task
exports.delete=(req, res)=>{
    
}