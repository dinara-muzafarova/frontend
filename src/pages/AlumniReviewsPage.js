import React, { useEffect, useState } from 'react';
import './AlumniReviewsPage.css';

const AlumniReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reviews/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Ошибка: отзывы не массив:', data);
          setReviews([]);
        }
      })
      .catch(err => console.error('Ошибка загрузки отзывов:', err));
  }, []);

  const handleLike = (id) => {
    const liked = JSON.parse(localStorage.getItem('likedReviews') || '[]');

    if (liked.includes(id)) {
      alert('Вы уже лайкнули этот отзыв!');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/reviews/${id}/like/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setReviews(prev =>
          prev.map(r => (r.id === id ? { ...r, likes: data.likes } : r))
        );
        const updated = [...liked, id];
        localStorage.setItem('likedReviews', JSON.stringify(updated));
      })
      .catch(err => console.error('Ошибка лайка:', err));
  };

  return (
    <div className="alumni-container">
      <h2 className="alumni-title">Отзывы выпускников</h2>

      {reviews.map(review => (
        <div key={review.id} className="alumni-review">
          <div className="alumni-review-text">
            <h3>{review.name}</h3>
            <div className="alumni-graduation">Год выпуска: {review.graduation_year}</div>
            <p>«{review.text}»</p>

            <div className="alumni-actions">
              <button
                onClick={() => handleLike(review.id)}
                className="alumni-like-button"
              >
                👍 Лайк
              </button>
              <span className="alumni-likes-count">❤️ {review.likes}</span>
            </div>
          </div>

          {review.photo && typeof review.photo === 'string' && (
            <img
              src={review.photo}
              alt="Фото выпускника"
              className="alumni-photo"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AlumniReviewsPage;
