import React, { useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const SubmitReviewPage = ({ authToken }) => {
  const [formData, setFormData] = useState({
    name: '',
    graduation_year: '',
    text: '',
    photo: null,
  });

  const [message, setMessage] = useState('');

  if (!authToken) {
    return (
      <div className="container">
        <h2>Оставить отзыв</h2>
        <p>Для отправки отзыва необходимо <Link to="/login">войти</Link>.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
  
    API.post('reviews/', data)
      .then(() => {
        setMessage('Спасибо! Отзыв отправлен.');
        setFormData({
          name: '',
          graduation_year: '',
          text: '',
          photo: null,
        });
      })
      .catch(async (err) => {
        let msg = 'Ошибка при отправке. Попробуйте позже.';
        if (err.response) {
          const contentType = err.response.headers['content-type'];
          if (contentType && contentType.includes('application/json')) {
            msg = JSON.stringify(err.response.data, null, 2);
          } else {
            msg = `Ошибка ${err.response.status}: ${err.response.statusText}`;
          }
        }
        setMessage(msg);
      });
  };
  

  return (
    <div className="container">
      <h2>Оставить отзыв</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div>
          <label>ФИО:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Год выпуска:</label><br />
          <input type="number" name="graduation_year" value={formData.graduation_year} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Отзыв:</label><br />
          <textarea name="text" value={formData.text} onChange={handleChange} required rows={4} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Фото (необязательно):</label><br />
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Отправить</button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default SubmitReviewPage;
