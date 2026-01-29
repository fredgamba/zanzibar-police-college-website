import './Department.css';
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

      // 🔥 FIX: Use correct endpoint
      // const res = await api.get('public/pages/by-page/?page=department');
      // setContent(res.data);

      setContent(null); // fallback if API not ready
    } catch (err) {
      console.error('Error loading Department page:', err);
      setError('Failed to load department information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading Department information...</div>;
  if (error) return <div className="error">{error}</div>;
  
  // ✅ Fallback static content
if (!content) {
  return (
    <div className="department-page">
      <div className="department-container">
        <img 
          src="/images/book.jpg" 
          alt="Dar es Salaam Police Academy structure" 
          className="department-image" 
        />
        <div className="department-text">
          <h1>Dar es Salaam Police Academy Academic Wing</h1>
          <h2>Dar es Salaam Police Academy Departments</h2>
          <ul>
            <li>Inspectorate and Gazetted Officers Promotion Wing</li>
            <li>Public Order Management Wing</li>
            <li>Traffic Management and Control Wing</li>
            <li>Laws Wing</li>
            <li>Police Science Wing</li>
          </ul>
          <h2>Proficiency Programmes (short and long courses) Wing</h2>
          <ul>
            <li>Vehicle Inspection Wing</li>
            <li>Research and Publication Wing</li>
            <li>Field Craft and Self-Defense Wing</li>
            <li>Public Relations Officer</li>
            <li>Library Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="department-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
