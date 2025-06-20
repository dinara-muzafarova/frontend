import React, { useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import './SubmitReviewPage.css'; 

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
      <div className="alumni-container">
        <h2 className="alumni-title">Оставить отзыв</h2>
        <p className="alumni-message">Для отправки отзыва необходимо <Link to="/login" className="alumni-link">войти</Link>.</p>
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
    <div className="alumni-container">
      <h2 className="alumni-title">Оставить отзыв</h2>
      <form onSubmit={handleSubmit} className="alumni-form">
        <div className="alumni-form-group">
          <label className="alumni-label">ФИО:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Введите ФИО"
            className="alumni-input"
          />
        </div>
        
        <div className="alumni-form-group">
          <label className="alumni-label">Год выпуска:</label>
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            required
            placeholder="Введите год выпуска"
            className="alumni-input"
          />
        </div>
        
        <div className="alumni-form-group">
          <label className="alumni-label">Отзыв:</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
            placeholder="Напишите отзыв"
            rows={4}
            className="alumni-textarea"
          />
        </div>
        
        <div className="alumni-form-group">
          <label className="alumni-label">Фото (необязательно):</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="alumni-file-input"
          />
        </div>
        
        <button type="submit" className="alumni-submit-button">Отправить</button>
      </form>
      
      {message && <p className="alumni-message">{message}</p>}
    </div>
  );
};

export default SubmitReviewPage;