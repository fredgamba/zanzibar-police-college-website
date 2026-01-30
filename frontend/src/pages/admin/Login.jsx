<<<<<<< HEAD
// src/pages/admin/Login.jsx - FIXED
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('auth/token/', {
        username,
        password,
      });

      // 🔥 FIX: Save tokens properly
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Optional: Save user info
      // const userRes = await api.get('users/me/');
      // localStorage.setItem('user', JSON.stringify(userRes.data));

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Panel</h2>
        <div className="logo-wrapper">
          <img
            src="/images/police-academy-logo.png"
            alt="Police Academy Logo"
            className="police-logo"
          />
        </div>
        <p className="subtitle">Sign in to manage the academy</p>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field">
            <span className="icon"><i className="fas fa-user"></i></span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-field">
            <span className="icon"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          
          {/* 🔥 TEST BUTTONS FOR DEVELOPMENT */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <small>Test Accounts:</small>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin123');
                }}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
              >
                Use Admin
              </button>
              <button 
                type="button"
                onClick={() => {
                  setUsername('staff');
                  setPassword('staff123');
                }}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
              >
                Use Staff
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
=======
// src/pages/admin/Login.jsx - FIXED
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('auth/token/', {
        username,
        password,
      });

      // 🔥 FIX: Save tokens properly
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Optional: Save user info
      // const userRes = await api.get('users/me/');
      // localStorage.setItem('user', JSON.stringify(userRes.data));

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Panel</h2>
        <div className="logo-wrapper">
          <img
            src="/images/police-academy-logo.png"
            alt="Police Academy Logo"
            className="police-logo"
          />
        </div>
        <p className="subtitle">Sign in to manage the academy</p>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field">
            <span className="icon"><i className="fas fa-user"></i></span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-field">
            <span className="icon"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          
          {/* 🔥 TEST BUTTONS FOR DEVELOPMENT */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <small>Test Accounts:</small>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin123');
                }}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
              >
                Use Admin
              </button>
              <button 
                type="button"
                onClick={() => {
                  setUsername('staff');
                  setPassword('staff123');
                }}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
              >
                Use Staff
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}