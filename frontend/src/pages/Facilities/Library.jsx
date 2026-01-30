<<<<<<< HEAD
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Library() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/library/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Library page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Library info...</div>;
  if (!content) return <div>Library details not available.</div>;

  return (
    <div className="library-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
=======
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Library() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/library/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Library page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Library info...</div>;
  if (!content) return <div>Library details not available.</div>;

  return (
    <div className="library-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}