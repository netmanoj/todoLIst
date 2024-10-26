// client/src/TodoApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch all todos
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/todos', { text })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setText('');
  };

  // Toggle todo completed status
  const toggleComplete = (id, completed) => {
    axios.patch(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then((response) => {
        setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      })
      .catch((error) => console.error(error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              className={todo.completed ? 'completed' : ''}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
