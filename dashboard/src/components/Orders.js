import React from 'react';
import './Orders.css'; // Add styles for the Orders page

export default function Orders() {
  return (
    <div className="orders-container">
      <h2>Orders Page</h2>
      <p>Here you can view and manage all orders.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search orders..." />
        <button>Search</button>
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>John Doe</td>
            <td>Apple Watch</td>
            <td>2</td>
            <td>$400</td>
            <td>Shipped</td>
          </tr>
          <tr>
            <td>#002</td>
            <td>Jane Smith</td>
            <td>MacBook Pro</td>
            <td>1</td>
            <td>$1200</td>
            <td>Processing</td>
          </tr>
          <tr>
            <td>#003</td>
            <td>Michael Brown</td>
            <td>iPhone 13</td>
            <td>3</td>
            <td>$3000</td>
            <td>Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}