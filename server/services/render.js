const { default: axios } = require("axios");

exports.homeRoutes = (req, res) =>{
    res.render('index');
}

exports.add_task = (req, res) =>{
    res.render('add_task');
}

exports.edit_task = (req, res) =>{
    axios.get("https://localhost:3000/api/tasks",{params:{taskID:req.query.taskID}})
        .then(function(taskdata){
            res.render("edit_task",{task:taskdata})
        })
        .catch(err=>{
            res.send(err);
        })
}