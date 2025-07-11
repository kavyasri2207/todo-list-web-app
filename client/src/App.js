import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import TodoList from './components/TodoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [users, setUsers] = useState(() => {
    // Load users from localStorage or initialize empty
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    // Save users to localStorage whenever it changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return isLoggedIn ? (
    <TodoList setIsLoggedIn={setIsLoggedIn} user={user} />
  ) : showSignup ? (
    <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} setShowSignup={setShowSignup} users={users} setUsers={setUsers} />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setShowSignup={setShowSignup} users={users} setUsers={setUsers} />
  );
}

export default App;