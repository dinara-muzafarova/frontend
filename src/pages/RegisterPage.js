import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 

const RegisterPage = ({ setAuthToken }) => {
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

    fetch('http://127.0.0.1:8000/api/register/', {
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
          throw new Error(data?.error || 'Ошибка регистрации');
        }

        return data;
      })

      .then(() => {
        return fetch('http://127.0.0.1:8000/api-token-auth/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      })
      .then(async res => {
        const contentType = res.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
          ? await res.json()
          : null;

        if (!res.ok) {
          throw new Error(data?.error || 'Ошибка авторизации');
        }

        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        navigate('/account');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label className="register-label">Email:</label><br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Пароль:</label><br />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>
        </form>

        <div className="register-button-container">
          <button type="submit" className="register-submit-button" onClick={handleSubmit}>
            Зарегистрироваться
          </button>
        </div>

        {error && <p className="register-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
