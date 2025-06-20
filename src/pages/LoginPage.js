import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; 
import API from '../api/axios';

const LoginPage = ({ setAuthToken }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(async res => {
        const contentType = res.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
          ? await res.json()
          : null;

        if (!res.ok) {
          throw new Error(data?.error || 'Ошибка авторизации');
        }

        return data;
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        navigate('/account');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label className="login-label">Email:</label><br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <div className="login-form-group">
            <label className="login-label">Пароль:</label><br />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
        </form>

        <div className="login-button-container">
          <button type="submit" className="login-submit-button" onClick={handleSubmit}>
            Войти
          </button>
        </div>

        {error && <p className="login-error-message">{error}</p>}

        <div className="register-link-container">
          <p>Еще не зарегистрированы? <Link to="/register" className="login-link">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
