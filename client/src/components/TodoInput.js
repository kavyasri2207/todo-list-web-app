import React, { useState } from 'react';

function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded mr-2"
        placeholder="Enter a new task"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
    </form>
  );
}

export default TodoInput;