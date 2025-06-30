import React, { useEffect, useState } from "react";
import './Customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost/inventory%20management1/Inventory-management-system/dashboard/public/customers.php")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    fetch(`http://localhost/inventory%20management1/Inventory-management-system/dashboard/public/customers.php?id=${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        fetchData();
      })
      .catch(error => console.error("Delete error:", error));
  };

  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    fetch("http://localhost/inventory%20management1/Inventory-management-system/dashboard/public/customers.php", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCustomer)
    })
      .then(res => res.json())
      .then(() => {
        setEditingCustomer(null);
        fetchData();
      })
      .catch(err => console.error("Update error:", err));
  };

  // ===== ADD NEW CUSTOMER =====
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    fetch("http://localhost/inventory%20management1/Inventory-management-system/dashboard/public/customers.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer)
    })
      .then(res => res.json())
      .then(() => {
        setNewCustomer({ name: '', email: '', phone: '' });
        setAddingCustomer(false);
        fetchData();
      })
      .catch(err => console.error("Add error:", err));
  };

  return (
    <div className="container">
      <h2>Customers</h2>

      <button className="btn add" onClick={() => setAddingCustomer(true)}>+ Add New Customer</button>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button className="btn edit" onClick={() => handleEditClick(customer)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Add New Form === */}
      {addingCustomer && (
        <div className="edit-form">
          <h3>Add New Customer</h3>
          <label>Name:
            <input type="text" name="name" value={newCustomer.name} onChange={handleAddChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={newCustomer.email} onChange={handleAddChange} />
          </label>
          <label>Phone:
            <input type="text" name="phone" value={newCustomer.phone} onChange={handleAddChange} />
          </label>
          <button className="btn save" onClick={handleAddCustomer}>Add</button>
          <button className="btn cancel" onClick={() => setAddingCustomer(false)}>Cancel</button>
        </div>
      )}

      {/* === Edit Form === */}
      {editingCustomer && (
        <div className="edit-form">
          <h3>Edit Customer</h3>
          <label>Name:
            <input type="text" name="name" value={editingCustomer.name} onChange={handleEditChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={editingCustomer.email} onChange={handleEditChange} />
          </label>
          <label>Phone:
            <input type="text" name="phone" value={editingCustomer.phone} onChange={handleEditChange} />
          </label>
          <button className="btn save" onClick={handleSaveEdit}>Save</button>
          <button className="btn cancel" onClick={() => setEditingCustomer(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Customers;
