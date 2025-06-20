import React, { useState } from 'react';
import './MediaGalleryPage.css';

const MediaGallery = () => {
  const [selectedYear, setSelectedYear] = useState('');
  
  const handleYearFilterChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const mediaItems = [
    { id: 1, year: 1969, title: "Первые выпускники кафедры, АСУ-69-9", description: " ", imgSrc: "/media/lAO1y017zB4.jpg" },
    { id: 2, year: 2015, title: "Вручение премии Правительства Российской Федерации Л.И. Григореву", description: "", imgSrc: "/media/aQ3o9ajnCeY.jpg" },
    { id: 3, year: 2000, title: "Первый выпуск магистров, ИВМ-00-7", description: "", imgSrc: "/3.jpg" },
    { id: 4, year: 2007, title: "Группа ИВМ-07-07", description: "", imgSrc: "/4.jpg" },
    { id: 5, year: 2024, title: "Защиты диссертаций", description: "", imgSrc: "/media/w1LIJRa8iG00.jpg" },
    { id: 6, year: 2024, title: "Выпускники кафедры АСУ 2024", description: "", imgSrc: "/media/zGJaHvJ_Osg.jpg" },
    { id: 7, year: 2024, title: "Вручение дипломов выпускникам", description: "Описание фотографии 7", imgSrc: "/media/MCfHJB81lkA.jpg" },
    { id: 8, year: 2025, title: "Защиты дипломных работ 2025", description: "", imgSrc: "/media/z2DVTRXcsUs.jpg" },
    { id: 9, year: 2025, title: "Заседание ГЭК 2025", description: "Описание фотографии 9", imgSrc: "/media/x9MLj0xa9P4.jpg" },
  ];

  const filteredItems = selectedYear 
    ? mediaItems.filter(item => item.year.toString() === selectedYear)
    : mediaItems;

  return (
    <div className="media-gallery-container">
      <div className="media-gallery-content">
        <h2 className="account-title">Галерея</h2>
        <div className="filter-container">
          <div className="filter-title">Фильтрация по году</div>
          <select className="filter-select" value={selectedYear} onChange={handleYearFilterChange}>
            <option value="">Все годы</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2015">2015</option>
            <option value="2007">2007</option>
            <option value="2000">2000</option>
          </select>
        </div>

        <div className="media-gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="media-item">
              <img src={item.imgSrc} alt={item.title} className="media-image" />
              <div className="media-item-title">{item.title}</div>
              <div className="media-item-description">{item.description}</div>
              <div className="media-item-year">Год: {item.year}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="media-upload-form">
        <div className="media-upload-title">загрузить новое фото</div>
        <div className="media-form-group">
          <label className="media-label" htmlFor="photoTitle">Название</label>
          <input type="text" id="photoTitle" className="media-input" />
        </div>
        <div className="media-form-group">
          <label className="media-label" htmlFor="photoDescription">Описание</label>
          <textarea id="photoDescription" className="media-textarea"></textarea>
        </div>
        <div className="media-form-group">
          <label className="media-label" htmlFor="photoFile">Выберите файл</label>
          <input type="file" id="photoFile" className="media-file-input" />
        </div>
        <button className="media-submit-button">Загрузить</button>
      </div>
    </div>
  );
};

export default MediaGallery;
