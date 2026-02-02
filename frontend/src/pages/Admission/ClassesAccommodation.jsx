
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function ClassesAccommodation() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/classes_accommodation/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Classes & Accommodation page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Classes & Accommodation info...</div>;
  if (!content) return <div>Details not available.</div>;

  return (
    <div className="classes-accommodation-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );

}