import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function ApplicationProcess() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/application_process/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Application Process:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Application Process...</div>;
  if (!content) return <div>Not available.</div>;

  return (
    <div className="application-process-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}