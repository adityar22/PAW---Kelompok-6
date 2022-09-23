exports.homeRoutes = (req, res) =>{
    res.render('index');
}

exports.add_task = (req, res) =>{
    res.render('add_task');
}

exports.edit_task = (req, res) =>{
    res.render('edit_task');
}