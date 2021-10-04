const mongoose = require("mongoose");

// this is used to structure the data on the mongodb
const TaskSchema = new mongoose.Schema({
  // only the properties we specify here will be added to the collection
  name: {
    // basic validation
    type: String,
    required: [true, "you need to provide a name"],
    trim: true,
    maxlength: [20, "name should not exceed 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// A model is a class with which we construct documents. A representation for the collection if you will
// A model is a structure for the schema, so if the schema provides the structure for the document the model provides an interface to the database.
// mongoose.model(modelName, schema)
// const Task = mongoose.model("Task", TaskSchema);

// module.exports = Task;
module.exports = mongoose.model("Task", TaskSchema);
