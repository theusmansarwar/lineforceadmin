import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
 
import axios from 'axios';
import App from './App';
import Login from './Pages/Login';
function AppWrapper() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('Token'));
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setMessage({ type: 'success', text: 'Login Successfully' });
    navigate('/dashboard'); 
  };

  const handleLogout = async () => {
   

    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {     
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/logout`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`, 
              },
        });
setIsAuthenticated(false);
        localStorage.removeItem('Token');

        
        navigate(''); 
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    
  };
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [message, setMessage]);
  return (
    <>
     
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<App onLogout={handleLogout} message={message} setMessage={setMessage}/>}/>
        ) : (
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
        )}
      </Routes>
    </>
  );
}

export default AppWrapper;
