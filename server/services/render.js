const axios = require("axios");

exports.homeRoutes = (req, res) =>{
    axios.get('http://localhost:3000/api/tasks')
        .then(function(response){
            // console.log(response)
            res.render('index', {tasks:response.data});
        })
        .catch(err=>{
           res.send(err);
        })
}

exports.add_task = (req, res) =>{
    res.render('add_task');
}

exports.edit_task = (req, res) =>{
    axios.get('http://localhost:3000/api/tasks',{params : {id:req.query.id}})
        .then(function(taskdata){
            res.render("edit_task",{task : taskdata.data})
        })
        .catch(err=>{
            res.send(err);
        })
}