import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Perform logout and redirect to login page after component mount
  useEffect(() => {
    // Clear the state and navigate to the login page
    const handleLogout = () => {
      navigate('/login', { state: { ...state, token: null, refreshToken: null } });
    };
    
    // Perform logout
    handleLogout();
  }, []); // Empty dependency array to ensure this effect runs only once after mount

  // Prevent rendering anything on the Logout route
  return null;
};

export default Logout;
