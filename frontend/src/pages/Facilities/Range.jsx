<<<<<<< HEAD
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Range() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/range/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Range page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Range info...</div>;
  if (!content) return <div>Range details not available.</div>;

  return (
    <div className="range-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
=======
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Range() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/range/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Range page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Range info...</div>;
  if (!content) return <div>Range details not available.</div>;

  return (
    <div className="range-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}