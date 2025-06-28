import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.clear(); // Example: Clear localStorage
    sessionStorage.clear(); // Example: Clear sessionStorage

    // Redirect to the home.html page
    window.location.href = '/home.html'; // Redirect to home.html
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Are you sure you want to log out?</h2>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1e3a8a',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Logout
      </button>
    </div>
  );
}