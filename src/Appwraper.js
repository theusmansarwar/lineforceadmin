import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import App from './App';
import Login from './Pages/Login';
// import Accept from './Pages/Login';
import { logout } from './DAL/auth';

function AppWrapper() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('Token');
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setMessage({ type: 'success', text: 'Login Successfully' });
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logout();
      localStorage.removeItem('Token');
     
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  useEffect(() => {
   
    const accessToken = localStorage.getItem('Token');
    if (!accessToken) {
      setIsAuthenticated(false);
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Routes>
      {/* <Route path="/agent-invite/:id/:name" element={<Accept />} /> */}
      {isAuthenticated ? (
        <Route path="/*" element={<App onLogout={handleLogout} message={message} />} />
      ) : (
        <Route path="/*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      )}
    </Routes>
  );
}

export default AppWrapper;
