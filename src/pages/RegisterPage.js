import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setAuthToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
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

    // 1. Регистрация нового пользователя
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

      // 2. Авторизация — получение токена
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
          throw new Error(data?.non_field_errors?.[0] || 'Ошибка авторизации');
        }

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
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Имя пользователя:</label><br />
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
        <button type="submit" style={{ marginTop: '10px' }}>
          Зарегистрироваться
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
