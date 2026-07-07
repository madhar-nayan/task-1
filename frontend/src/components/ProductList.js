import React from 'react';
import Card from './Card';
import './ProductList.css';

function ProductList({ products, onDelete, onOrder, onToggleStock, currentUser }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No Products Yet</h3>
        <p>Add your first product using the button above.</p>
      </div>
    );
  }

  return (
    <section className="product-list">
      <h2 className="section-title">All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
            inStock={product.inStock}
            owner={product.owner}
            onDelete={onDelete}
            onOrder={() => onOrder(product)}
            onToggleStock={() => onToggleStock(product)}
            currentUser={currentUser}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
