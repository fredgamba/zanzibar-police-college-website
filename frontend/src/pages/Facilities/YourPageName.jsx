
import { useEffect, useState } from 'react';
import api from '../../utils/api';

const pageKey = 'your_page_key_in_snake_case'; // e.g., 'sport_gym'

export default function YourPageName() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`pages/${pageKey}/`)
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