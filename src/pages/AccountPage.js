import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';

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
      API.get('me/'),         // Получаем информацию о текущем пользователе
      API.get('reviews/')     // Получаем все отзывы
    ])
      .then(([userRes, reviewRes]) => {
        const currentUser = userRes.data;
        setUser(currentUser);

        // Проверь, как выглядит структура объекта отзыва в reviewRes.data
        console.log('Все отзывы:', reviewRes.data);

        // Если в объекте отзыва есть поле user_id или user, фильтруем отзывы текущего пользователя
        const userReviews = reviewRes.data.filter(
          review => review.user === currentUser.id  // Или use review.user_id, если у тебя такое поле
        );

        setReviews(userReviews);
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

  if (loading) return <p className="account-container">Загрузка...</p>;

  return (
    <div className="account-container">
      <h2 className="account-title">Личный кабинет</h2>

      {user ? (
        <div className="user-info">
          <p><strong>Логин:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email || 'не указан'}</p>
        </div>
      ) : (
        <p>Ошибка загрузки данных пользователя.</p>
      )}

      <button onClick={handleNewReview} className="button">
        📝 Оставить отзыв
      </button>

      <h3 className="review-section-title">ваши отзывы</h3>
      {reviews.length === 0 ? (
        <p>У вас ещё нет отзывов.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-card">
            <p><strong>ФИО:</strong> {review.name}</p>
            <p><strong>Год выпуска:</strong> {review.graduation_year}</p>
            <p><strong>Отзыв:</strong> «{review.text}»</p>
            {review.photo && (
              <img
                src={review.photo}
                alt="Фото выпускника"
                className="review-photo"
              />
            )}
            <div>
              <button onClick={() => handleEdit(review.id)} className="button">
                ✏️ Редактировать
              </button>
              <button onClick={() => handleDelete(review.id)} className="button">
                🗑 Удалить
              </button>
            </div>
          </div>
        ))
      )}

      <button onClick={handleLogout} className="button logout-button">
        🚪 Выйти
      </button>
    </div>
  );
};

export default AccountPage;
