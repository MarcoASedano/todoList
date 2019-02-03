var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todoList", { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
