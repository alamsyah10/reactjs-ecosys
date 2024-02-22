import React from 'react';
import './Sidebar.css'; // Import the CSS file for styles

const Sidebar = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar">
      <button type="button" onClick={() => handleNavigation('/profile')} className="buttons btn btn-secondary">Profile</button>
      <button type="button" onClick={() => handleNavigation('/pick-ingredients')} className="buttons btn btn-secondary">Pick Ingredients</button>
      <button type="button" onClick={() => handleNavigation('/show-providers')} className="buttons btn btn-secondary">Show Providers</button>
      <button type="button" onClick={() => handleNavigation('/customer-task-history/1')} className="buttons btn btn-secondary">Task History</button>
      <button type="button" onClick={() => handleNavigation('/logout')} className="buttons btn btn-secondary">Logout</button>
    </div>
  );
};

export default Sidebar;
