import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = ({ authToken, setAuthToken }) => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    Promise.all([
      API.get('me/'),
      API.get('reviews/')
    ])
      .then(([userRes, reviewRes]) => {
        setUser(userRes.data);
        setReviews(reviewRes.data);
      })
      .catch(err => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [authToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/');
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить отзыв?')) {
      API.delete(`reviews/${id}/`)
        .then(() => {
          setReviews(prev => prev.filter(r => r.id !== id));
        })
        .catch(() => alert('Ошибка при удалении отзыва'));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`);
  };

  const handleNewReview = () => {
    navigate('/submit-review');
  };

  if (loading) return <p className="container">Загрузка...</p>;

  return (
    <div className="container">
      <h2>Личный кабинет</h2>

      {user ? (
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Логин:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email || 'не указан'}</p>
        </div>
      ) : (
        <p>Ошибка загрузки данных пользователя.</p>
      )}

      <button onClick={handleNewReview} style={{ marginBottom: '20px' }}>
        📝 Оставить отзыв
      </button>

      <h3>Мои отзывы</h3>
      {reviews.length === 0 ? (
        <p>У вас ещё нет отзывов.</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id} style={{ marginBottom: '30px' }}>
              <p><strong>ФИО:</strong> {review.name}</p>
              <p><strong>Год выпуска:</strong> {review.graduation_year}</p>
              <p><strong>Отзыв:</strong> {review.text}</p>
              {review.photo && (
                <img
                  src={review.photo}
                  alt="Фото выпускника"
                  style={{ width: '200px', marginTop: '10px' }}
                />
              )}
              <br />
              <button onClick={() => handleEdit(review.id)} style={{ marginRight: '10px', marginTop: '10px' }}>
                ✏️ Редактировать
              </button>
              <button onClick={() => handleDelete(review.id)} style={{ marginTop: '10px' }}>
                🗑 Удалить
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} style={{ marginTop: '30px' }}>
        🚪 Выйти
      </button>
    </div>
  );
};

export default AccountPage;
