import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    API.get('partners/')
      .then(res => setPartners(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Компании-партнёры</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {partners.map(partner => (
          <div key={partner.id} style={{ border: '1px solid #ccc', padding: '15px', width: '300px' }}>
            {partner.logo && (
              <img
                src={`http://127.0.0.1:8000${partner.logo}`}
                alt={partner.name}
                style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', marginBottom: '10px' }}
              />
            )}
            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
            {partner.website && (
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                Перейти на сайт
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersPage;
