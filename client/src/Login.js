import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      alert(res.data);
      if (res.data === 'Login successful') setIsLoggedIn(true);
    } catch (error) {
      alert('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(/login-bg.jpg)`,
        backgroundSize: '100% 100%', // Stretch to fit screen
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white bg-opacity-90 p-4 rounded-xl shadow-2xl w-full max-w-md text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Login</h2>
        <input
          className="border-2 border-gray-200 p-3 mb-3 w-1/2 mx-auto block rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg placeholder-gray-500"
          style={{ minHeight: '40px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="border-2 border-gray-200 p-3 mb-4 w-1/2 mx-auto block rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg placeholder-gray-500"
          style={{ minHeight: '40px' }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white p-2 w-1/2 mx-auto block rounded-lg hover:bg-indigo-700 transition duration-300 text-xl"
          onClick={handleLogin}
        >
          Login
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Login;