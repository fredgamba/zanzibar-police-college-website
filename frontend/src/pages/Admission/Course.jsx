import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Course() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/course/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Course page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Course info...</div>;
  if (!content) return <div>Course details not available.</div>;

  return (
    <div className="course-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}