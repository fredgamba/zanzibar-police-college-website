<<<<<<< HEAD
// src/pages/Admission/Dispensary.jsx
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Dispensary() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/dispensary/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Dispensary page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Dispensary information...</div>;
  if (!content) return <div>Dispensary details not available.</div>;

  return (
    <div className="dispensary-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
=======
// src/pages/Admission/Dispensary.jsx
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Dispensary() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/dispensary/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Dispensary page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Dispensary information...</div>;
  if (!content) return <div>Dispensary details not available.</div>;

  return (
    <div className="dispensary-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}