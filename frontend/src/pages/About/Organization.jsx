import { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Organization.css';

export default function Organization() {
  const [apiContent, setApiContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/organization/')
      .then(res => {
        setApiContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Organization Structure:', err);
        // Don't worry - we'll show the chart anyway
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="org-loading">
        <div className="spinner"></div>
        <p>Loading Organization Structure...</p>
      </div>
    );
  }

  return (
    <div className="organization-page">
      {/* Header Section */}
      <div className="org-header">
        <div className="org-header-decoration"></div>
        <h1 className="org-title">Organization Structure</h1>
        <p className="org-subtitle">Dar es Salaam Police Academy</p>
      </div>

      {/* Organization Chart - Always shows */}
      <div className="org-chart-container">
        <div className="org-chart">
          
          {/* Level 1: Commandant */}
          <div className="org-level level-1">
            <div className="org-box commandant">
              <div className="box-icon">⭐</div>
              <h3>COMMANDANT DPA</h3>
            </div>
          </div>

          {/* Level 2: Chief Instructor & Staff Officer */}
          <div className="org-level level-2">
            <div className="org-row">
              <div className="org-box chief-instructor">
                <div className="box-icon">👨‍🏫</div>
                <h4>CHIEF INSTRUCTOR</h4>
              </div>
              
              <div className="org-box staff-officer">
                <div className="box-icon">👔</div>
                <h4>STAFF OFFICER</h4>
              </div>
            </div>
          </div>

          {/* Level 3: Academic Coordinator */}
          <div className="org-level level-3">
            <div className="org-box coordinator">
              <div className="box-icon">📋</div>
              <h4>ACADEMIC COORDINATOR</h4>
            </div>
          </div>

          {/* Level 4: Departments Split */}
          <div className="org-level level-4">
            <div className="org-split">
              
              {/* Left Side - Academic Departments */}
              <div className="org-section academic-section">
                <div className="section-header">
                  <h3>Academic Departments</h3>
                </div>
                
                <div className="org-grid">
                  <div className="org-box department">
                    <div className="box-icon">🎓</div>
                    <h5>DEPART. HEAD OF DIP. POL. SCIENCE</h5>
                  </div>
                  
                  <div className="org-box department">
                    <div className="box-icon">🏥</div>
                    <h5>DEPART. HEAD OF HEALTH SCIENCE</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">📝</div>
                    <h5>ADMISSION OFFICER</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">📊</div>
                    <h5>EXAMINATION OFFICER</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">📚</div>
                    <h5>LIBRARIAN I/C</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">✅</div>
                    <h5>QUALITY ASSURANCE OFFICER</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">👨‍🏫</div>
                    <h5>ACADEMIC INSTRUCTORS</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">💻</div>
                    <h5>ICT I/C</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">⚔️</div>
                    <h5>DRILL INSTRUCTORS</h5>
                  </div>
                  
                  <div className="org-box unit">
                    <div className="box-icon">🔬</div>
                    <h5>RESEARCH OFFICER</h5>
                  </div>
                </div>
              </div>

              {/* Right Side - Administrative Departments */}
              <div className="org-section admin-section">
                <div className="section-header">
                  <h3>Administrative Departments</h3>
                </div>
                
                <div className="org-grid">
                  <div className="org-box admin">
                    <div className="box-icon">👤</div>
                    <h5>ADJUTANT</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">🏥</div>
                    <h5>WELFARE OFFICER</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">📦</div>
                    <h5>STORES & SUPPLY I/C</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">🏠</div>
                    <h5>MATRON</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">💼</div>
                    <h5>ESTATE MANAGER</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">💰</div>
                    <h5>ACCOUNTANTS</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">📊</div>
                    <h5>RSM</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">🤝</div>
                    <h5>PUBLIC RELATIONS OFFICER</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">⚕️</div>
                    <h5>MEDIC I/C</h5>
                  </div>
                  
                  <div className="org-box admin">
                    <div className="box-icon">🛠️</div>
                    <h5>SUPPORTING STAFF</h5>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Level 5: All Students */}
          <div className="org-level level-5">
            <div className="org-box students">
              <div className="box-icon">👥</div>
              <h3>ALL STUDENTS</h3>
            </div>
          </div>

        </div>
      </div>

      {/* Additional Content from API (if available) */}
      {apiContent && apiContent.content && (
        <div className="org-additional-content">
          <div dangerouslySetInnerHTML={{ __html: apiContent.content }} />
        </div>
      )}
    </div>
  );
}