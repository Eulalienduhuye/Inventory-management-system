import React from 'react';
import './Invoices.css'; // Optional: Add styles for the page

function Invoices() {
  // Sample data for invoices
  const invoices = [
    { id: 1, customer: 'John Doe', date: '2025-06-28', total: '$120.50' },
    { id: 2, customer: 'Jane Smith', date: '2025-06-27', total: '$85.00' },
    { id: 3, customer: 'Michael Brown', date: '2025-06-26', total: '$45.75' },
  ];

  return (
    <div className="invoices-page">
      <h1>Invoices</h1>
      <table className="invoices-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.date}</td>
              <td>{invoice.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;