import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function History() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/history/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading History page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading History...</div>;
  if (!content) return <div>History not available.</div>;

  return (
    <div className="history-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}