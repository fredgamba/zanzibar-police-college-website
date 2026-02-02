
// src/pages/YourSection/YourPage.jsx
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function YourPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'your_page_key' with the snake_case key from Django
    api.get('pages/your_page_key/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!content) return <div>Content not found.</div>;

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );

}