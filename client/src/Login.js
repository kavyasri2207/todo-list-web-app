import React, { useState, useEffect } from 'react';

function Login({ setIsLoggedIn, setUser, setShowSignup, users }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // Clear previous error
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password. Please signup first.');
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = '/login-bg.jpg';
    img.onload = () => console.log('Background image /login-bg.jpg loaded successfully for Login');
    img.onerror = () => console.error('Error loading background image /login-bg.jpg for Login. Check file or path.');
  }, []);

  return (
    <div
      className="min-h-screen p-4 flex items-center justify-center"
      style={{
        backgroundImage: `url(/login-bg.jpg)`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          className="border-2 border-gray-300 p-2 w-1/4 mx-auto block mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          style={{ minHeight: '50px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <input
          type="password"
          className="border-2 border-gray-300 p-2 w-1/4 mx-auto block mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          style={{ minHeight: '50px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button
          className="bg-blue-600 text-white p-2 w-1/4 mx-auto block rounded-lg hover:bg-blue-700 transition duration-200"
          style={{ minHeight: '50px' }}
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-green-600 text-white p-2 w-1/4 mx-auto block mt-4 rounded-lg hover:bg-green-700 transition duration-200"
          style={{ minHeight: '50px' }}
          onClick={() => setShowSignup(true)}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Login;