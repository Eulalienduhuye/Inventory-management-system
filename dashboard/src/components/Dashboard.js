// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Ensure this file contains styles for the cards

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
        <div className="cards-container">
          {/* Customers Card */}
          <div className="card card-customers">
            <h3>Customers</h3>
            <p>1,234</p>
          </div>

          {/* Orders Card */}
          <div className="card card-orders">
            <h3>Orders</h3>
            <p>567</p>
          </div>

          {/* Products Card */}
          <div className="card card-products">
            <h3>Products</h3>
            <p>89</p>
          </div>
        </div>
      </div>
    </div>
  );
}
