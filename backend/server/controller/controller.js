var taskDB = require('../model/model');

//create and save new task
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can be empty" });
        return;
    }
    const task = taskDB({
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        taskTime: req.body.taskTime,
        taskPriority: req.body.taskPriority,
        taskStat: req.body.taskStat
    });

    task
        .save(task)
        .then(data => {
            // res.send(data)
            res.redirect('/add_task')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            });
        });
}

//retrieve and return all tasks
exports.find = (req, res) => {

    if (req.params.id) {
        const id = req.params.id;

        taskDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not Found task with id" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving task with id" + id })
            })
    } else {
        taskDB.find()
            .then(task => {
                res.send(task)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving task information" })
            })
    }
}

//update a new task by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;
    taskDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update task with ${id}. Maybe task not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update task information" })
        })
}

//delete task
exports.delete = (req, res) => {
    const id = req.params.id;

    taskDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete task with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete task with id = " + id
            });
        });
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