import React, { useState } from 'react';

function TodoList({ todos, toggleTodo, editTodo, deleteTodo }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTodo(id, editText);
    setEditId(null);
    setEditText('');
  };

  return (
    <ul className="list-none">
      {todos.map(todo => (
        <li key={todo._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
            className="mr-2"
          />
          {editId === todo._id ? (
            <div className="flex-1">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 rounded"
              />
              <button onClick={() => saveEdit(todo._id)} className="bg-green-500 text-white p-1 rounded ml-2">Save</button>
            </div>
          ) : (
            <span className={todo.completed ? 'line-through text-gray-500' : ''} onDoubleClick={() => handleEdit(todo._id, todo.text)}>
              {todo.text}
            </span>
          )}
          <button onClick={() => deleteTodo(todo._id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;