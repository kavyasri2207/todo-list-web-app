import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Login from './Login'; // Updated path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {isLoggedIn ? (
        <TodoList setIsLoggedIn={setIsLoggedIn} user={user} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      )}
    </div>
  );
}

export default App;