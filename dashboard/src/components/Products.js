// Products.js
import React, { useState } from 'react';
import './Products.css'; // Optional: Add styles for the page

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple', price: 1.5, quantity: 50 },
    { id: 2, name: 'Banana', price: 0.5, quantity: 100 },
    { id: 3, name: 'Orange', price: 1.0, quantity: 75 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      setProducts([
        ...products,
        { id: products.length + 1, ...newProduct, price: parseFloat(newProduct.price), quantity: parseInt(newProduct.quantity) },
      ]);
      setNewProduct({ name: '', price: '', quantity: '' });
    }
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Update a product
  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="products-page">
      <h2>Products Page</h2>
      <p>Here you can manage all your products.</p>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Products Table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                    }
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <button onClick={handleUpdateProduct}>Save</button>
                ) : (
                  <button onClick={() => setEditingProduct(product)}>Edit</button>
                )}
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}