const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/Connect')
require('dotenv').config()
const notFound = require('./middleware/not-found');

app.use(express.static('./public'))
app.use(express.json());
app.use('/api/tasks', tasks)
app.use(notFound)
const port = 3001;

const start = () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, console.log("Listening " + port));
    } 
    catch(err) {
        console.log(err)
    }
}

start()