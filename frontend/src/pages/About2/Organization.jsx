import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Organization() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/organization/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Organization Structure:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Organization Structure...</div>;
  if (!content) return <div>Not available.</div>;

  return (
    <div className="organization-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}