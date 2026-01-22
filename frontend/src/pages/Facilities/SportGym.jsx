import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function SportGym() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/sport_gym/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Sport & Gym page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Sport & Gym info...</div>;
  if (!content) return <div>Sport & Gym details not available.</div>;

  return (
    <div className="sport-gym-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}