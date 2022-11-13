const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const taskRouter = require('./server/routes/taskRouter');
const userRouter = require('./server/routes/userRouter');
const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({ path: "config.env" })
const PORT = process.env.PORT || 8080

//tag req
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse req
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set view engine
app.set("view engine", "ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load asstes
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });