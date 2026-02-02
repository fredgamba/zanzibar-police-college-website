
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function DrivingSchool() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/driving_school/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Driving School page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Driving School info...</div>;
  if (!content) return <div>Driving School details not available.</div>;

  return (
    <div className="driving-school-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );

}