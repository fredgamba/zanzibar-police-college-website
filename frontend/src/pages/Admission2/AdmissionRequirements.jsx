import React, { useState } from "react";
import {
  GraduationCap,
  FileText,
  BookOpen,
  TrendingUp,
  Users,
  CheckCircle,
  Calendar,
  AlertCircle,
  ChevronRight,
  Clock,
  Target,
  Shield,
} from "lucide-react";

import "./AdmissionRequirements.css";

const programs = [
  {
    id: 1,
    icon: <GraduationCap />,
    title: "Diploma Program",
    duration: "2-3 Years",
    intake: "Annual",
    description:
      "Comprehensive professional training program for aspiring officers",
    details: [
      "Apply through NACTE portal",
      "Merit-based selection process",
      "Multiple specialization tracks",
      "Theory and practical training",
    ],
    color: "#1e40af",
  },
  {
    id: 2,
    icon: <FileText />,
    title: "Certificate in Law",
    duration: "1 Year",
    intake: "Annual",
    description: "Specialized legal training for law enforcement professionals",
    details: [
      "Apply through UDSM",
      "Selection by university board",
      "Professional legal certification",
      "Practical case studies",
    ],
    color: "#be123c",
  },
  {
    id: 3,
    icon: <BookOpen />,
    title: "Certifricate in Laboratory Technician",
    duration: "1 Year",
    intake: "Annual",
    description: "Technical certification for forensic laboratory work",
    details: [
      "NACTE application process",
      "Specialized technical training",
      "Modern lab equipment access",
      "Industry certification",
    ],
    color: "#0f766e",
  },
  {
    id: 4,
    icon: <TrendingUp />,
    title: "Promotion Program",
    duration: "Varies",
    intake: "As Needed",
    description: "Career advancement for serving officers",
    details: [
      "PHQ nomination required",
      "Based on PGO 53 guidelines",
      "Performance evaluation",
      "Leadership development",
    ],
    color: "#9333ea",
  },
  {
    id: 5,
    icon: <Users />,
    title: "other Programs",
    duration: "Flexible",
    intake: "On Demand",
    description: "Tailored training for specific organizational needs",
    details: [
      "Stakeholder collaboration",
      "Customized curriculum",
      "Flexible scheduling",
      "Corporate training available",
    ],
    color: "#ea580c",
  },
];

const AdmissionRequirement = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="admission-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={20} />
            <span>Excellence in Training</span>
          </div>
          <h1 className="hero-title">
            Admission
            <br />
            Requirements
          </h1>
          <p className="hero-subtitle">
            Begin your journey to becoming a professional law enforcement
            officer at one of East Africa's premier training institutions
          </p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-grid"></div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="notice-card">
        <div className="notice-icon">
          <AlertCircle size={28} />
        </div>
        <div className="notice-content">
          <h3>Terms & Regulations</h3>
          <p>
            Admission to the academy implies full acceptance and commitment to
            uphold all institutional statutes, regulations, ethical standards,
            and codes of conduct throughout your training period.
          </p>
        </div>
      </div>

      {/* Programs Section */}
      <div className="programs-section">
        <div className="section-header">
          <Target size={32} />
          <h2>Available Programs</h2>
          <p>Choose your path to excellence in law enforcement</p>
        </div>

        <div className="programs-grid">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`program-card ${
                activeCard === program.id ? "active" : ""
              }`}
              onMouseEnter={() => setActiveCard(program.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ "--card-color": program.color }}
            >
              <div className="card-accent"></div>
              <div className="card-header">
                <div className="card-icon">{program.icon}</div>
                <div className="card-meta">
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{program.intake}</span>
                  </div>
                </div>
              </div>

              <h3 className="card-title">{program.title}</h3>
              <p className="card-description">{program.description}</p>

              <div className="card-details">
                <h4>Program Highlights</h4>
                <ul className="details-list">
                  {program.details.map((detail, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="card-button">
                <span>Learn More</span>
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Timeline */}
      <div className="timeline-section">
        <div className="section-header">
          <Calendar size={32} />
          <h2>Application Timeline</h2>
        </div>
        <div className="timeline-grid">
          <div className="timeline-item">
            <div className="timeline-number">01</div>
            <div className="timeline-content">
              <h4>December</h4>
              <p>Applications Open</p>
              <span className="timeline-detail">
                Registration begins for next academic year
              </span>
            </div>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-number">02</div>
            <div className="timeline-content">
              <h4>January - April</h4>
              <p>Application Period</p>
              <span className="timeline-detail">
                Submit documents and complete screening
              </span>
            </div>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-number">03</div>
            <div className="timeline-content">
              <h4>May</h4>
              <p>Selection & Results</p>
              <span className="timeline-detail">
                Final selections announced
              </span>
            </div>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-number">04</div>
            <div className="timeline-content">
              <h4>Next Academic Year</h4>
              <p>Program Begins</p>
              <span className="timeline-detail">
                Orientation and coursework start
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Take the first step towards a rewarding career in law enforcement
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">Apply Now</button>
            <button className="btn-secondary">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionRequirement;
