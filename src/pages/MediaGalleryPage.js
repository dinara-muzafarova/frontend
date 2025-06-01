import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const MediaGalleryPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');

  useEffect(() => {
    API.get('media/')
      .then(res => setMediaItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleFileChange = (event) => {
    setMediaFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setMediaTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setMediaDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mediaFile) {
      alert("Выберите файл.");
      return;
    }

    const formData = new FormData();
    formData.append('title', mediaTitle);
    formData.append('description', mediaDescription);
    formData.append('media_type', mediaFile.type.startsWith('image') ? 'photo' : 'video');
    formData.append('file', mediaFile);

    try {
      const response = await API.post('media/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMediaItems([...mediaItems, response.data]);
        setMediaTitle('');
        setMediaDescription('');
        setMediaFile(null);
        alert("Файл успешно загружен.");
      }
    } catch (error) {
      console.error('Ошибка при загрузке медиафайла:', error);
      alert("Ошибка при загрузке. Проверьте поля или попробуйте позже.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Галерея</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {mediaItems.map(item => {
          const file = item.media_file;

          return (
            <div key={item.id} style={{ width: '300px' }}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div style={{ border: '1px solid #ddd', padding: '10px' }}>
                {file ? (
                  file.endsWith('.mp4') || file.endsWith('.webm') ? (
                    <video width="100%" controls>
                      <source src={`http://127.0.0.1:8000${file}`} type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  ) : (
                    <img
                      src={`http://127.0.0.1:8000${file}`}
                      alt={item.title}
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                    />
                  )
                ) : (
                  <p>Нет медиафайла</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h3>Загрузить медиафайл</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div>
          <label>Заголовок:</label><br />
          <input
            type="text"
            value={mediaTitle}
            onChange={handleTitleChange}
            required
            placeholder="Введите заголовок"
          />
        </div>
        <div>
          <label>Описание:</label><br />
          <textarea
            value={mediaDescription}
            onChange={handleDescriptionChange}
            required
            placeholder="Введите описание"
          />
        </div>
        <div>
          <label>Выберите файл:</label><br />
          <input type="file" onChange={handleFileChange} accept="image/*,video/*" required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Загрузить</button>
      </form>
      
    </div>
  );
};

export default MediaGalleryPage;

