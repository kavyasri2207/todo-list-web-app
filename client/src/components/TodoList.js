import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';

function TodoList({ setIsLoggedIn, user }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`todoTasks_${user?.username || 'guest'}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [newDueDateTime, setNewDueDateTime] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', dueDateTime: '', priority: 'Medium' });

  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const [currentDateTime, setCurrentDateTime] = useState(new Date(now).toISOString().slice(0, 16));

  useEffect(() => {
    localStorage.setItem(`todoTasks_${user?.username || 'guest'}`, JSON.stringify(tasks));
  }, [tasks, user?.username]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nowIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      setCurrentDateTime(new Date(nowIST).toISOString().slice(0, 16));
    }, 10000); // Update every 10 seconds for testing
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = '/todo-bg.jpg';
    img.onload = () => console.log('Background image /todo-bg.jpg loaded successfully');
    img.onerror = () => console.error('Error loading background image /todo-bg.jpg. Check file or path.');
  }, []);

  const addTask = () => {
    if (newTask.trim() && newDueDateTime) {
      setTasks([...tasks, { title: newTask.trim(), description: '', completed: false, dueDateTime: newDueDateTime, priority: newPriority }]);
      setNewTask('');
      setNewDueDateTime('');
      setNewPriority('Medium');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
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

  const isOverdue = (dueDateTime) => {
    if (!dueDateTime) return false;
    const due = new Date(dueDateTime);
    const now = new Date(currentDateTime);
    return now > due;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-800';
    }
  };

  const getTaskColor = (task) => {
    if (task.completed) return 'text-gray-500 line-through';
    if (isOverdue(task.dueDateTime)) return 'text-red-500';
    return getPriorityColor(task.priority); // Direct priority color
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: `url(/todo-bg.jpg)`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#f0f0f0', // Fallback color
      }}
    >
      <div className="bg-white p-3 max-w-md mx-auto rounded-lg shadow-lg" style={{ backdropFilter: 'blur(5px)' }}>
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Todo List - {user?.username || 'Guest'}</h2>
        <div className="mb-3 flex items-center">
          <input
            className="border-2 border-gray-300 p-3 mb-1 w-1/3 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            style={{ minHeight: '40px' }}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
          <input
            type="datetime-local"
            className="border-2 border-gray-300 p-2 mb-1 w-1/3 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            value={newDueDateTime}
            onChange={(e) => setNewDueDateTime(e.target.value)}
            style={{ minHeight: '40px' }}
          />
          <select
            className="border-2 border-gray-300 p-2 mb-1 w-1/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 animate-pulse-once"
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
                    className="border-2 border-gray-300 p-2 w-1/4 mx-auto block rounded-lg text-base" // Decreased to w-1/4
                    style={{ minHeight: '200px' }} // Increased to 200px
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    placeholder="Description"
                  />
                  <input
                    type="datetime-local"
                    className="border-2 border-gray-300 p-2 mb-1 w-1/2 mx-auto block rounded-lg text-base"
                    value={editedTask.dueDateTime}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDateTime: e.target.value })}
                    style={{ minHeight: '40px' }}
                  />
                  <select
                    className="border-2 border-gray-300 p-2 mb-1 w-1/2 mx-auto block rounded-lg text-base"
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <button
                    className="mt-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 highlight-option"
                    onClick={() => saveEdit(index)}
                  >
                    <FaSave /> Save
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-2"
                  />
                  <div>
                    <p
                      className={getTaskColor(task)}
                      style={{ margin: 0 }}
                    >
                      {task.title} {task.dueDateTime && ` (Due: ${new Date(task.dueDateTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }).split(',')[0]} ${task.dueDateTime.slice(11, 16)})`}
                    </p>
                    {task.description && (
                      <p className={`${task.completed ? 'text-gray-500 text-xs' : isOverdue(task.dueDateTime) ? 'text-red-500 text-xs' : 'text-xs text-gray-600'}`}>
                        {task.description}
                      </p>
                    )}
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
    50% { background-color: #bbf7d0; }
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
    color: #1e40af;
  }
  .text-red-600 { color: #dc2626 !important; }
  .text-yellow-600 { color: #ca8a04 !important; }
  .text-green-600 { color: #16a34a !important; }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TodoList;