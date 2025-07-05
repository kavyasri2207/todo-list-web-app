import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (text) => {
    const newTodo = { text, completed: false };
    try {
      const response = await axios.post('http://localhost:5000/api/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { ...todo, completed: !todo.completed });
      setTodos(todos.map(t => t._id === id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const editTodo = async (id, newText) => {
    const todo = todos.find(t => t._id === id);
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { ...todo, text: newText });
      setTodos(todos.map(t => t._id === id ? { ...t, text: newText } : t));
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
        <TodoInput addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
      </header>
    </div>
  );
}

export default App;