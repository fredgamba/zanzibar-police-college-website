// src/pages/About/Department.jsx - FIXED
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Department() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartmentContent();
  }, []);

  const fetchDepartmentContent = async () => {
    try {
      setLoading(true);
      setError('');
      
      // 🔥 FIX: Use correct endpoint format
      const res = await api.get('public/pages/by-page/?page=department');
      
      // OR if using the slug endpoint (add this to your backend)
      // const res = await api.get('public/pages/department/');
      
      setContent(res.data);
    } catch (err) {
      console.error('Error loading Department page:', err);
      setError('Failed to load department information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading Department information...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!content) return <div>Department details not available.</div>;

  return (
    <div className="department-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}