import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('history/')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>История кафедры</h2>
      <ul>
        {history.map(history => (
          <li key={history.id}>
            <h3>{history.full_name}</h3>
            <p>{history.position}</p>
            <img src={`http://127.0.0.1:8000${history.photo}`} alt={history.full_name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
