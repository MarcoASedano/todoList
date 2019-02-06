$(document).ready(function() {
  $.getJSON("/api/todos")
  .then(addTodos);

  $("#todoInput").keypress(function(event) {
    if (event.which === 13) {
      createTodo($("#todoInput").val());
    }
  });

  $(".list").on("click", "li", function() {
    updateTodo($(this));
  });

  $(".list").on("click", "span", function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });

});

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var todoLi = $('<li class="task">' + todo.name + " <span>X</span></li>");
  todoLi.data("id", todo._id);
  todoLi.data("completed", todo.completed)
  if (todo.completed) {
    todoLi.addClass("done");
  }
  $(".list").append(todoLi);
}

function createTodo(name) {
  $.post("/api/todos", {name: name})
  .then(function(newTodo) {
    addTodo(newTodo);
    $("#todoInput").val('');
  })
  .catch(function(err) {
    console.log(err);
  });
}

function removeTodo(todo) {
  var clickedId = todo.data("id");
  var deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function(err) {
    console.log(err);
  });
}

function updateTodo(todo) {
  var updateUrl = "/api/todos/" + todo.data("id");
  var isDone = !todo.data("completed");
  var updateData = {completed: isDone};
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo) {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  })
  .catch(function(err) {
    console.log(err);
  });
}
