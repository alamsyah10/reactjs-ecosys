import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const SidebarCustomer = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/profile" className="sidebar-link">Profile</Link>
        </li>
        <li>
          <Link to="/ingredients" className="sidebar-link">Pick Ingredients</Link>
        </li>
        <li>
          <Link to="/show-providers" className="sidebar-link">Show Providers</Link>
        </li>
        <li>
          <Link to="/customer-task-history/1" className="sidebar-link">Task History</Link>
        </li>
        <li>
          <Link to="/logout" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarCustomer;
