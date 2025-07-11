import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';

function TodoList({ setIsLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '' });

  useEffect(() => {
    setTasks([]); // Placeholder; replace with API call later
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask.trim(), description: '' }]);
      setNewTask('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask({ ...tasks[index] });
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: `url(/todo-bg.jpg)`,
        backgroundSize: '100% 100%', // Stretch to fit screen
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-white p-3 max-w-md mx-auto rounded-lg shadow-lg" style={{ backdropFilter: 'blur(5px)' }}>
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Todo List</h2>
        <div className="mb-3 flex">
          <input
            className="border-2 border-gray-300 p-3 mb-1 w-1/2 mx-auto block rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            style={{ minHeight: '40px' }}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-200 animate-pulse-once"
            onClick={addTask}
          >
            <FaPlus />
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded-lg flex items-center justify-between animate-pulse-once highlight-on-add"
              style={{ fontSize: '1.2rem', padding: '1rem' }}
            >
              {editingIndex === index ? (
                <div className="w-full">
                  <input
                    className="border-2 border-gray-300 p-2 mb-1 w-1/2 mx-auto block rounded-lg text-base"
                    style={{ minHeight: '40px' }}
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />
                  <textarea
                    className="border-2 border-gray-300 p-2 w-1/2 mx-auto block rounded-lg text-base"
                    style={{ minHeight: '40px' }}
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    placeholder="Description"
                  />
                  <button
                    className="mt-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 highlight-option"
                    onClick={() => saveEdit(index)}
                  >
                    <FaSave /> Save
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-base">{task.title}</p>
                  {task.description && <p className="text-xs text-gray-600">{task.description}</p>}
                  <div className="mt-1 flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 highlight-option"
                      onClick={() => startEditing(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 highlight-option"
                      onClick={() => deleteTask(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-3 bg-red-600 text-white p-2 w-1/2 mx-auto block rounded-lg hover:bg-red-700 transition duration-200 text-base"
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// CSS for animations and highlights
const styles = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  @keyframes highlight {
    0% { background-color: transparent; }
    50% { background-color: #bbf7d0; } /* Light green highlight */
    100% { background-color: transparent; }
  }
  .animate-pulse-once {
    animation: pulse 0.5s ease-in-out;
  }
  .highlight-on-add {
    animation: highlight 1s ease-in-out;
  }
  .highlight-option {
    transition: transform 0.3s, color 0.3s;
  }
  .highlight-option:hover {
    transform: scale(1.2);
    color: #1e40af; /* Stronger highlight color on hover */
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TodoList;