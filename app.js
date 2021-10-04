const express = require("express");
require("dotenv").config();

const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const unknown = require("./middleware.js/unknown");
const errorHandler = require("./middleware.js/errorHandler");

// to serve static files
app.use(express.static("./public"));
// middleware to parse the json
app.use(express.json());

// routes
// domain/api/v1/item/:id - convention for api routes

// app.get('/api/v1/tasks')            - get all the tasks
// app.post('/api/v1/tasks')           - create a new task
// app.get('/api/v1/tasks/:id')        - get single task
// app.patch('/api/v1/tasks/:id')      - update task
// app.delete('/api/v1/tasks/:id')     - delete task

app.use("/api/v1/tasks", tasks);
// this means when we go to the api in quotation marks, we see the tasks const

app.use(unknown);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    // this way we pass the hidden url into the connectDB function
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
// We need to connect to the DB before the server starts listening, so if no connection the the server doesn't start

start();
// This calls the entire function in the order we specified above

// Not bad, not bad
