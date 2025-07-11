import React, { useState, useEffect } from 'react';

function Signup({ setIsLoggedIn, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (username.trim() && password.trim()) {
      setUser({ username: username.trim() });
      setIsLoggedIn(true);
    } else {
      alert('Please enter both username and password');
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = '/login-bg.jpg';
    img.onload = () => console.log('Background image /login-bg.jpg loaded successfully for Signup');
    img.onerror = () => console.error('Error loading background image /login-bg.jpg for Signup. Check file or path.');
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
        backgroundColor: '#f0f0f0', // Fallback color only
      }}
    >
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Signup</h2>
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
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;