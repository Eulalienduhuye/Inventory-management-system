// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaFileInvoice, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>SmartBasket</h1>
        <nav>
          <Link to="/dashboard">
            <FaTachometerAlt className="icon" /> Dashboard
          </Link>
          <Link to="/products">
            <FaBoxOpen className="icon" /> Products
          </Link>
          <Link to="/orders">
            <FaClipboardList className="icon" /> Orders
          </Link>
          <Link to="/invoices">
            <FaFileInvoice className="icon" /> Invoices
          </Link>
          <Link to="/settings">
            <FaCog className="icon" /> Settings
          </Link>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
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