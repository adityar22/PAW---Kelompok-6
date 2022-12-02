const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const connectDB = require('./server/database/connection');
const taskRouter = require('./server/routes/taskRouter');
const userRouter = require('./server/routes/userRouter');
const notesRouter = require('./server/routes/notesRouter');
const eventsRouter = require('./server/routes/eventsRouter');

const app = express();
dotenv.config({ path: "config.env" })
const PORT = process.env.PORT || 8000

//tag req
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse req
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/events', eventsRouter);

app.use(express.static(path.join(__dirname, "./frontend/build")));

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