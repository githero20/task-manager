const mongoose = require("mongoose");
// instance name is mongoose

const connectDB = (url) => {
  return mongoose.connect(url);
  // this means it accepts a url, and we'll pass our hidden url into it when we get to the index.js file
  // method name is connect
};

// We need to connect to the DB before the server starts listening, so if no connection the the server doesn't start
// to do this we export this mongoose into index.js and use it with that of the server in an async, await combo
module.exports = connectDB;
