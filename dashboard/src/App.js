import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<div>Products Page</div>} />
        <Route path="/orders" element={<div>Orders Page</div>} />
        <Route path="/invoices" element={<div>Invoices Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
