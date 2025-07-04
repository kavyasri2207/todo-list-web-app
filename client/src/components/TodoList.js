import React, { useState } from 'react';

function TodoList({ todos, updateTodo, deleteTodo }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  const handleSave = (id) => {
    if (editText.trim()) {
      updateTodo(id, { text: editText, completed: todos.find(todo => todo._id === id).completed });
      setEditId(null);
      setEditText('');
    }
  };

  const toggleComplete = (id, completed) => {
    updateTodo(id, { completed: !completed });
  };

  return (
    <ul className="w-full max-w-md">
      {todos.map(todo => (
        <li
          key={todo._id}
          className="flex items-center justify-between p-2 border-b bg-white rounded-md mb-2"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              className="mr-2"
            />
            {editId === todo._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            )}
          </div>
          <div>
            {editId === todo._id ? (
              <button
                onClick={() => handleSave(todo._id)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;