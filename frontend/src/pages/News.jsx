
// src/pages/News.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('news/')
      .then(res => {
        setNewsList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading news...</div>;

  return (
    <div className="news-page">
      <h1>Latest News</h1>
      {newsList.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <div className="news-list">
          {newsList.map(item => (
            <div key={item.id} className="news-item">
              <h2>{item.title}</h2>
              <p><em>{new Date(item.date_posted).toLocaleDateString()}</em></p>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

}