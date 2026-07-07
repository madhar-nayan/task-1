import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import LoginPage from './components/LoginPage';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api/products';
const AUTH_URL = API_URL.replace(/\/api\/products$/, '/api/auth');

async function parseJsonResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text || response.statusText };
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      const result = await response.json();
      setProducts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (productData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user': user },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to add product');
    await fetchProducts();
    setShowForm(false);
  };

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'x-user': user },
    });
    const data = await parseJsonResponse(response);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete product');
    }
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleToggleStock = async (product) => {
    const response = await fetch(`${API_URL}/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user': user,
      },
      body: JSON.stringify({ inStock: !product.inStock }),
    });

    const updated = await parseJsonResponse(response);
    if (!response.ok) {
      throw new Error(updated.message || 'Failed to update stock status');
    }

    setProducts((prev) => prev.map((p) => (p._id === product._id ? updated.data : p)));
  };

  const handleOrderProduct = (product) => {
    window.alert(`Order placed for ${product.name}. We will contact ${product.owner || 'the vendor'} soon.`);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCategory('All');
  };

  const handleAuth = async ({ username, password }, isRegister = false) => {
    if (!username.trim() || !password.trim()) {
      setLoginError('Username and password are required.');
      return;
    }

    try {
      const response = await fetch(`${AUTH_URL}/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.message || 'Authentication failed');
        return;
      }

      setUser(data.data.username);
      setLoginError(null);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category || '').filter(Boolean)))];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="app">
      {!user ? (
        <LoginPage onLogin={handleAuth} error={loginError} />
      ) : (
        <>
          <Header
            onToggleForm={() => setShowForm(!showForm)}
            showForm={showForm}
            user={user}
            onLogout={handleLogout}
          />

          <main className="main-content">
            <section className="hero">
              <div className="hero-badge">MERN Stack Internship — Task 1</div>
              <h1>Product Catalog</h1>
          <p>
            A full-stack React + Express + MongoDB application showcasing
            components, props, REST API, and data fetching.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-value">{products.filter((p) => p.inStock).length}</span>
              <span className="stat-label">In Stock</span>
            </div>
            <div className="stat">
              <span className="stat-value">{new Set(products.map((p) => p.category)).size}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </section>

        {showForm && (
          <AddProductForm onSubmit={handleAddProduct} onCancel={() => setShowForm(false)} />
        )}

        {!loading && !error && (
          <div className="filter-row">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-input"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">!</div>
            <h3>Connection Error</h3>
            <p>{error}</p>
            <p className="error-hint">Make sure the backend server is running on port 5002 and MongoDB is connected.</p>
            <button className="btn btn-primary" onClick={fetchProducts}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <ProductList
            products={filteredProducts}
            onDelete={handleDeleteProduct}
            onOrder={handleOrderProduct}
            onToggleStock={handleToggleStock}
            currentUser={user}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Website Technology. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://www.website.com" target="_blank" rel="noopener noreferrer">www.website.com</a>
          <a href="mailto:hr@website.com">hr@website.com</a>
        </div>
      </footer>
    </>
      )}
    </div>
  );
}

export default App;
