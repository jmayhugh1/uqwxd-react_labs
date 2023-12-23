import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {


  // creating states and state functions to modify the state of the todolist and its
  // edits
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditng] = useState(null);
  // Add the handlesubmit code here
  const handlesubmit = (e) => {

    e.preventDefault(); // prevents the default submission behavior for the form
    let todo = document.getElementById("todoAdd").value; // gets the value of the input that has the id todoAdd
    const newtodo = {
      id: new Date().getTime(), // creates a unique id for each todo
      text: todo.trim(), // trims the todo text
      completed: false, // sets the completed property to false
    };
    if (newtodo.text.length > 0) {
      console.log("adding new todo");
      setTodos([...todos].concat(newtodo)); // [...todos] creates a shallow copy
      // setTodos is done asynchronously
    }

    document.getElementById("todoAdd").value = ""; // clears the input field by setting its value to an empty string
  };

  useEffect(() => { 
    // the useEffect hook in this instance will runwhenever todos is changed
    console.log(todos);
  }, [todos]);

  // Add the deleteToDo code here
  const deleteToDo = (id, event) => {
    console.log(event);
    let updatedlist = [...todos].filter((todo) => todo.id !== id); // creates a new list that does not contain the todo with the id that was passed in
    setTodos(updatedlist);
  };
  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    let updatedlist = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedlist);
  };

  // Add the submitEdits code here
  const submitEdits = (todo) => {
    let updatedText = document.getElementById(todo.id).value; // gets the value of the input that has the id todo.id
    console.log(updatedText);
    let newList = [...todos].map((item) => {
      if ((item.id = todo.id)) {
        item.text = updatedText;
      }
      return item;
    });
    setTodos(newList);
    setTodoEditng(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handlesubmit}>
        <input type="text" align="right" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            ></input>
            {todo.id === todoEditing ? (
              <input type="text" id={todo.id} defaultValue={todo.text}></input>
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          {todo.id === todoEditing ? (
            <button onClick={() => submitEdits(todo)}>submit edit</button>
          ) : (
            <button onClick={() => setTodoEditng(todo.id)}>edit</button>
          )}
          <button onClick={(event) => deleteToDo(todo.id, event)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default App;
