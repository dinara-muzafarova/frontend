import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const MediaGalleryPage = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    API.get('media/')
      .then(res => setMediaItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Галерея</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {mediaItems.map(item => (
          <div key={item.id} style={{ width: '300px' }}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div style={{ border: '1px solid #ddd', padding: '10px' }}>
              {item.media_file.endsWith('.mp4') || item.media_file.endsWith('.webm') ? (
                <video width="100%" controls>
                  <source src={`http://127.0.0.1:8000${item.media_file}`} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              ) : (
                <img
                  src={`http://127.0.0.1:8000${item.media_file}`}
                  alt={item.title}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGalleryPage;
