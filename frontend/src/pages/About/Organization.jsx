import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Organization() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('pages/organization/')
      .then((res) => {
        setContent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading Organization Structure:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px 20px' }}>Loading Organization Structure...</div>;
  }

  if (!content || !content.content) {
    return (
      <div
        style={{
          padding: '40px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '32px', color: '#001f3f' }}>Organization Structure</h1>

        <img
          src="/images/structure.jpg"
          alt="Dar es Salaam Police Academy Organization Structure"
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            margin: '0 auto',           // ← this centers the image horizontally
            borderRadius: '8px',        // optional: nicer look
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // optional: subtle depth
          }}
        />
      </div>
    );
  }

  return (
    <div className="organization-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', color: '#001f3f' }}>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}