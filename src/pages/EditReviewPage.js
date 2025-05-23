import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    graduation_year: '',
    text: '',
    photo: null,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get(`reviews/${id}/`)
      .then(res => {
        setFormData({
          name: res.data.name,
          graduation_year: res.data.graduation_year,
          text: res.data.text,
          photo: null, 
        });
      })
      .catch(() => setMessage('Ошибка загрузки отзыва'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    API.patch(`reviews/${id}/`, data)
      .then(() => {
        setMessage('Отзыв обновлён!');
        setTimeout(() => navigate('/account'), 1000);
      })
      .catch(() => setMessage('Ошибка при сохранении'));
  };

  return (
    <div className="container">
      <h2>Редактировать отзыв</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div>
          <label>ФИО:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Год выпуска:</label><br />
          <input type="number" name="graduation_year" value={formData.graduation_year} onChange={handleChange} required />
        </div>
        <div>
          <label>Отзыв:</label><br />
          <textarea name="text" value={formData.text} onChange={handleChange} rows={4} required />
        </div>
        <div>
          <label>Новое фото (необязательно):</label><br />
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Сохранить изменения</button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default EditReviewPage;
