// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import api from './api';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUser(token)
        .then(user => setUser(user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const handleLogin = async (user) => {
    try {
      setUser(user);
      localStorage.setItem('token', user.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Signup onSignup={handleSignup} />
        </>
      )}
      <footer>
        <p>
          By signing up, you agree to our <a href="/terms">Terms of Service</a>.
        </p>
      </footer>
    </div>
  );
};

export default App;
