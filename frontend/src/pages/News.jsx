import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('public/news/')
      .then(res => {
        setNewsList(res.data[1]); // assuming res.data is an array
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load news.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-page">
      <style>{`
        .news-page {
          width: 100%;
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }
        .news-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .news-item {
          display: flex;
          flex-direction: row;   /* side by side */
          align-items: flex-start;
          gap: 0;                /* no gap between image and text */
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }

        .news-image {
          flex: 1;
          width: 50%;            /* reduce size to 70% */
          height: auto;          /* keep aspect ratio */
          object-fit: contain;   /* no cropping */
          border-radius: 6px;
          margin-right: 20px;
        }

        .news-content {
          flex: 1;
          margin-left: 0;        /* ensure no spacing */
        }

        .news-content h2 {
          margin: 0 0 8px;
        }
        .news-date {
          font-size: 0.9em;
          color: #666;
          margin-bottom: 12px;
        }
      `}</style>

      <h1>Latest News</h1>
      {newsList.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <div className="news-list">
          {newsList.map(item => (
            <div key={item.id} className="news-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2>{item.title}</h2>
                <p className="news-date">
                  <em>{new Date(item.date_posted).toLocaleDateString()}</em>
                </p>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}