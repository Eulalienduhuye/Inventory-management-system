// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaFileInvoice, FaSignOutAlt, FaUsers, FaShoppingCart, FaBoxes } from 'react-icons/fa';
import RevenueChart from './RevenueChart'; // Import the RevenueChart component
import './Dashboard.css';

export default function Dashboard() {
  
  const topSellingProducts = [
    { name: 'Apple', price: '700 Rwf', quantitySold: 150, image: '/images/apple.jpg' },
    { name: 'Soft Drinks', price: '2000 Rwf', quantitySold: 120, image: '/images/softdrinks.jpg' },
    { name: 'Bread', price: '1500 Rwf', quantitySold: 100, image: '/images/bread.jpg' },
    { name: 'Cheese', price: '5000 Rwf', quantitySold: 80, image: '/images/cheese.jpeg' },
    { name: 'Vegetables', price: '1500 Rwf', quantitySold: 75, image: '/images/vegetables.jpeg' },
  ];
  
  

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
          <Link to="/customers">
            <FaFileInvoice className="icon" /> Customers
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
            <FaUsers className="card-icon" />
            <h3> Total Customers</h3>
            <p>1,234</p>
          </div>

          {/* Orders Card */}
          <div className="card card-orders">
            <FaShoppingCart className="card-icon" />
            <h3>Total Orders</h3>
            <p>567</p>
          </div>

          {/* Products Card */}
          <div className="card card-products">
            <FaBoxes className="card-icon" />
            <h3>Total Products</h3>
            <p>89</p>
          </div>
        </div>

        {/* Revenue and Top Selling Products */}
        <div className="revenue-top-selling-container">
          {/* Revenue Card */}
          <div className="card card-revenue">
            <h3>Revenue Earned (Rwf)</h3>
            <RevenueChart />
          </div>

          {/* Top Selling Products Card */}
          <div className="card card-top-selling">
            <h3>Top Selling Products</h3>
            <table className="top-selling-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="product-info">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <span>{product.name}</span>
                    </td>
                    <td className="product-details">
                      <p>Price: {product.price}</p>
                      <p>Sold: {product.quantitySold}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}