import React from 'react';
import './Header.css';

function Header({ onToggleForm, showForm, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">M</div>
          <div className="logo-text">
            <span className="logo-name">Website</span>
            <span className="logo-tagline">Technology</span>
          </div>
        </div>

        <nav className="header-nav">
          {user && (
            <>
              <div className="header-user">
                <span>Signed in as</span>
                <strong>{user}</strong>
              </div>
              <button className="btn btn-secondary" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
          <button
            className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
            onClick={onToggleForm}
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
