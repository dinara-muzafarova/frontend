import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    API.get('achievements/')
      .then(res => setAchievements(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Достижения кафедры АСУ</h2>
      <ul>
        {achievements.map(item => (
          <li key={item.id} style={{ marginBottom: '20px' }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Дата:</strong> {item.date}</p>
            {item.student_name && <p><strong>Студент:</strong> {item.student_name}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsPage;
