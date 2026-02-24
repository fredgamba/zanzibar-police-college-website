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

      const res = await api.get('public/pages/by-page/?page=department');
      setContent(res.data);
    } catch (err) {
      console.error('Error loading Department page:', err);
      // Don't set error, just use fallback content
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Department information...</p>
      </div>
    );
  }

  // Always show fallback content (whether API failed or returned nothing)
  return (
    <div className="department-page">
      {/* Hero Section */}
     
     
     <p className="hero-subtitle">OUR DEPARTMENTS</p>
      {/* Main Content */}
      <div className="department-container">
        {/* Library Image Card */}
        <div className="library-card">
          <div className="image-wrapper">
            <img
              src="/images/book.jpg"
              alt="DPA Main Library"
              className="department-image"
            />
            <div className="image-caption">
              <span className="caption-icon">📚</span>
              <span className="caption-text">ZPC Main Library</span>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="departments-grid">
          {/* Inspectorate Wing */}
          <div className="department-card">
            <div className="card-header">
              <span className="card-icon">🎖️</span>
              <h2 className="card-title">Inspectorate And Gazetted Officers Promotion Wing</h2>
            </div>
            <div className="card-content">
              <ul className="wing-list">
                <li>
                  <span className="list-icon">▸</span>
                  <span>Public Order Management wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Traffic Management and Control wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Laws wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Police Science wing</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Proficiency Wing */}
          <div className="department-card">
            <div className="card-header">
              <span className="card-icon">📋</span>
              <h2 className="card-title">Proficiency Programmes (Short And Long Courses) Wing</h2>
            </div>
            <div className="card-content">
              <ul className="wing-list">
                <li>
                  <span className="list-icon">▸</span>
                  <span>Vehicle Inspection wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Research and Publication wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Field Craft and Self-defense wing</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Public Relations officer</span>
                </li>
                <li>
                  <span className="list-icon">▸</span>
                  <span>Library services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="bottom-decoration"></div>
    </div>
  );
}