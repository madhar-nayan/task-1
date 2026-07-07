import React from 'react';
import './Card.css';

function Card({ name, description, price, category, image, inStock, onDelete, onOrder, onToggleStock, owner, currentUser, id }) {
  const isOwner = owner && currentUser === owner;

  return (
    <article className="card">
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" loading="lazy" />
        <span className={`card-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="card-body">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        {owner && (
          <div className="card-owner">Added by {owner}</div>
        )}

        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={onOrder}>
              Order
            </button>
            {isOwner && onToggleStock && (
              <button className="btn btn-secondary" onClick={onToggleStock}>
                {inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
              </button>
            )}
            {isOwner && onDelete && (
              <button className="btn btn-danger" onClick={() => onDelete(id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
