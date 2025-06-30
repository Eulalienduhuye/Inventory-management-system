import React, { useEffect, useState } from 'react';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const [editProduct, setEditProduct] = useState(null);
  const endpoint = 'http://localhost/inventory%20management1/Inventory-management-system/dashboard/public/product.php';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch(err => console.error("Fetch error:", err));
  };

  const handleAdd = () => {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(() => {
        setNewProduct({ name: '', price: '', quantity: '' });
        fetchProducts();
      })
      .catch(err => console.error("Add error:", err));
  };

  const handleUpdate = () => {
    fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct)
    })
      .then(res => res.json())
      .then(() => {
        setEditProduct(null);
        fetchProducts();
      })
      .catch(err => console.error("Update error:", err));
  };

  const handleDelete = (id) => {
    fetch(`${endpoint}?id=${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => fetchProducts())
      .catch(err => console.error("Delete error:", err));
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* Add New Product */}
      <div>
        <h3>Add Product</h3>
        <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input placeholder="Price" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
        <input placeholder="Quantity" type="number" value={newProduct.quantity} onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Products Table */}
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ color: 'black' }}>ID</th>
            <th style={{ color: 'black' }}>Name</th>
            <th style={{ color: 'black' }}>Price</th>
            <th style={{ color: 'black' }}>Quantity</th>
            <th style={{ color: 'black' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="5">No products available</td></tr>
          ) : (
            products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  {editProduct?.id === prod.id ? (
                    <input value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} />
                  ) : (
                    prod.name
                  )}
                </td>
                <td>
                  {editProduct?.id === prod.id ? (
                    <input value={editProduct.price} type="number" onChange={e => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })} />
                  ) : (
                    prod.price
                  )}
                </td>
                <td>
                  {editProduct?.id === prod.id ? (
                    <input value={editProduct.quantity} type="number" onChange={e => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })} />
                  ) : (
                    prod.quantity
                  )}
                </td>
                <td>
                  {editProduct?.id === prod.id ? (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditProduct(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditProduct(prod)}>Edit</button>
                      <button onClick={() => handleDelete(prod.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
