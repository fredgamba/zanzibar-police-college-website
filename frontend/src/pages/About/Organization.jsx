import { useEffect, useState } from 'react';
import './Organization.css';

export default function Organization() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const academicDepts = [
    { icon: '🎓', title: 'DEPART. HEAD OF DIP. POL. SCIENCE', type: 'dept' },
    { icon: '🏥', title: 'DEPART. HEAD OF HEALTH SCIENCE', type: 'dept' },
    { icon: '📝', title: 'ADMISSION OFFICER', type: 'unit' },
    { icon: '📊', title: 'EXAMINATION OFFICER', type: 'unit' },
    { icon: '📚', title: 'LIBRARIAN I/C', type: 'unit' },
    { icon: '✅', title: 'QUALITY ASSURANCE OFFICER', type: 'unit' },
    { icon: '👨‍🏫', title: 'ACADEMIC INSTRUCTORS', type: 'unit' },
    { icon: '💻', title: 'ICT I/C', type: 'unit' },
    { icon: '⚔️', title: 'DRILL INSTRUCTORS', type: 'unit' },
    { icon: '🔬', title: 'RESEARCH OFFICER', type: 'unit' },
  ];

  const adminRSMDepts = [
    { icon: '💰', title: 'ACCOUNTANT AND PROCUREMENT' },
    { icon: '📦', title: 'STORE AND PROCUREMENT' },
    { icon: '🚌', title: 'TRANSPORTATION' },
    { icon: '🤝', title: 'STUDENTS & STAFF WELFARE & DISCIPLINARY' },
    { icon: '🌿', title: 'PUBLIC HEALTH & ENVIRONMENTAL SANITATION' },
    { icon: '🏗️', title: 'PROJECT & ESTATE MANAGEMENT' },
    { icon: '📋', title: 'ACADEMIC COMMITTEE' },
    { icon: '⚖️', title: 'LEGAL' },
    { icon: '🪖', title: 'FIELD & MILITARY INSTRUCTOR' },
    { icon: '🔭', title: 'RESEARCH AND DEVELOPMENT' },
    { icon: '⚽', title: 'SPORTS & RECREATION' },
    { icon: '💻', title: 'ICT' },
    { icon: '📖', title: 'LIBRARY SERVICES' },
  ];

  return (
    <div className={`organization-page ${visible ? 'visible' : ''}`}>
      {/* Background decorative elements */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>

      {/* Header */}
      <header className="org-header">
        <div className="header-badge">ZPC</div>
        <h1 className="org-title">Organization Structure</h1>
        <p className="org-subtitle">Zanzibar Police College</p>
        <div className="header-line"></div>
      </header>

      <main className="org-chart-wrapper">
        {/* LEVEL 1: Commandant */}
        <div className="level level-1">
          <div className="connector-start"></div>
          <div className="org-card commandant">
            <div className="card-glow"></div>
            <span className="card-icon">⭐</span>
            <h3>COMMANDANT ZPC</h3>
          
          </div>
        </div>

        {/* LEVEL 2: Chief Instructor & Staff Officer */}
        <div className="level level-2">
          <div className="branch-line branch-line-2"></div>
          <div className="level-row">
            <div className="org-card blue-card">
              <span className="card-icon">👨‍🏫</span>
              <h4>CHIEF INSTRUCTOR</h4>
            </div>
            <div className="org-card blue-card">
              <span className="card-icon">👔</span>
              <h4>STAFF OFFICER</h4>
            </div>
          </div>
        </div>

        {/* LEVEL 3: Academic Coordinator */}
        <div className="level level-3">
          <div className="v-connector"></div>
          <div className="org-card teal-card">
            <span className="card-icon">📋</span>
            <h4>ACADEMIC COORDINATOR</h4>
          </div>
        </div>

        {/* LEVEL 4: Academic Departments */}
        <div className="level level-4">
          <div className="v-connector"></div>
          <div className="section-panel academic-panel">
            <div className="panel-header academic-header">
              <span className="panel-icon">🎓</span>
              <h3>Academic Departments</h3>
            </div>
            <div className="dept-grid">
              {academicDepts.map((d, i) => (
                <div className={`dept-card dept-card--${d.type}`} key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className="dept-icon">{d.icon}</span>
                  <span className="dept-title">{d.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEVEL 4B: Adjutant → RSM flow */}
        <div className="level level-adjutant">
          <div className="v-connector"></div>
          <div className="adjutant-flow">
            <div className="org-card adjutant-card">
              <span className="card-icon">👤</span>
              <h4>ADJUTANT</h4>
            </div>
            <div className="v-connector short"></div>
            <div className="org-card rsm-card">
              <span className="card-icon">🎖️</span>
              <h4>RSM</h4>
              <div className="rsm-accent"></div>
            </div>
          </div>
        </div>

        {/* LEVEL 5: RSM Departments Grid */}
        <div className="level level-5">
          <div className="v-connector"></div>
          <div className="section-panel admin-panel">
            <div className="panel-header admin-header">
              <span className="panel-icon">🏛️</span>
              <h3>Administrative Departments</h3>
            </div>
            <div className="dept-grid dept-grid--admin">
              {adminRSMDepts.map((d, i) => (
                <div className="dept-card dept-card--admin" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                  <span className="dept-icon">{d.icon}</span>
                  <span className="dept-title">{d.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEVEL 6: All Students */}
        <div className="level level-students">
          <div className="v-connector"></div>
          <div className="org-card students-card">
            <div className="card-glow students-glow"></div>
            <span className="card-icon">👥</span>
            <h3>ALL STUDENTS</h3>
            
          </div>
        </div>
      </main>
    </div>
  );
}
