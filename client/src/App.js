import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import TodoList from './components/TodoList';

function App() {
  const [page, setPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      {!isLoggedIn ? (
        <>
          {page === 'login' ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Signup />}
          <div className="text-center mt-4">
            <button
              className="bg-gray-500 text-white p-2 rounded mx-2"
              onClick={() => setPage(page === 'login' ? 'signup' : 'login')}
            >
              Switch to {page === 'login' ? 'Signup' : 'Login'}
            </button>
          </div>
        </>
      ) : <TodoList setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;