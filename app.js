var express = require("express"),
    app     = express(),
    port    = 3000;

app.get("/", function(req, res) {
  res.json({message: "Hi from JS object"});
});

app.listen(port, function() {
  console.log("The todoList server has started!");
});
