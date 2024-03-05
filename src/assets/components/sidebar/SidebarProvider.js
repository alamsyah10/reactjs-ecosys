import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const SidebarProvider = () => {
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
          <Link to="/insert-ingredients" className="sidebar-link">Insert Ingredients</Link>
        </li>
        <li>
          <Link to="/list-ingredients" className="sidebar-link">List Ingredients</Link>
        </li>
        <li>
          <Link to="/provider-task" className="sidebar-link">Tasks</Link>
        </li>
        <li>
          <Link to="/provider-task-history/1" className="sidebar-link">Task History</Link>
        </li>
        <li>
          <Link to="/logout" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarProvider;
