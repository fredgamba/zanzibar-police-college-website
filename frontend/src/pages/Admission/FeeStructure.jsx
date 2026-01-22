import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function FeeStructure() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/fee_structure/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Fee Structure:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Fee Structure...</div>;
  if (!content) return <div>Not available.</div>;

  return (
    <div className="fee-structure-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}