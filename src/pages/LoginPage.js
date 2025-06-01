import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setAuthToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        if (!res.ok) {
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            throw new Error(data.non_field_errors?.[0] || 'Ошибка входа');
          } else {
            throw new Error('Сервер вернул HTML вместо JSON (возможно, ошибка 404 или 500)');
          }
        }
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        navigate('/submit-review');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Логин:</label><br />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label><br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Войти</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
