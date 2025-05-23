import React, { useEffect, useState } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h2>Отзывы выпускников</h2>
      {reviews.map(review => (
        <div
          key={review.id}
          style={{
            marginBottom: '30px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            maxWidth: '600px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3>{review.name} ({review.graduation_year})</h3>
          <p>{review.text}</p>
          {review.photo && typeof review.photo === 'string' && (
            <img
              src={review.photo}
              alt="Фото выпускника"
              width="200"
              style={{ marginTop: '10px', borderRadius: '8px' }}
            />
          )}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleLike(review.id)}>👍 Лайк</button>
            <span style={{ marginLeft: '10px' }}>❤️ {review.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlumniReviewsPage;
