import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function AdmissionRequirements() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/admission_requirements/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Admission Requirements:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Admission Requirements...</div>;
  if (!content) return <div>Not available.</div>;

  return (
    <div className="admission-requirements-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}