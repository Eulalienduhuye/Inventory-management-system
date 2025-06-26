// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // if using separate file, or just rely on App.css

export default function Dashboard() {
  return (
    <div>
      <div className="sidebar">
        <h1>SmartBasket</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </div>

      <div className="main">
        <h2>Dashboard Overview</h2>
        <div className="card">
          <p>This is a summary card.</p>
        </div>
        <div className="card">
          <p>Another card with info.</p>
        </div>
      </div>
    </div>
  );
}
