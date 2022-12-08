const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const connectDB = require('./server/database/connection');
const taskRouter = require('./server/routes/taskRouter');
const userRouter = require('./server/routes/userRouter');
const notesRouter = require('./server/routes/notesRouter');
const errorHandler = require('./server/middleware/errorHandler');

const app = express();

// setup port
dotenv.config({ path: "config.env" })
const PORT = process.env.PORT || 8000

//tag req
app.use(morgan('dev'));

//mongoDB connection
connectDB();

// express third party middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);

// catch not found error
app.get('*', (req, res, next) => {
  try {
    throw {
      success: false,
      statusCode: 404,
      message: `${req.path} is not found`,
    }
  }
  catch (err) {
    next(err)
  }
})

// middleware error handler
app.use(errorHandler);

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });