import React, { useState } from 'react';

function LoginPage({ onLogin, error }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [mode, setMode] = useState('login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials, mode === 'register');
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Enter your credentials to access the product catalog.</p>

        {error && <p className="form-error">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit" className="btn btn-primary login-submit">
          {mode === 'login' ? 'Log In' : 'Register'}
        </button>

        <div className="login-toggle">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button type="button" className="link-button" onClick={() => setMode('register')}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" className="link-button" onClick={() => setMode('login')}>
                Log In
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
