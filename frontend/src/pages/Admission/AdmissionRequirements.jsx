import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  Clock,
  Target,
  Shield,
  Microscope,
  Search,
  Radio,
  Scale,
  Car,
  Award,
  Database,
} from "lucide-react";

import "./AdmissionRequirements.css";

const programs = [
  {
    id: 1,
    icon: <GraduationCap />,
    title: "Technician Certificate in Police Science (NTA Level 5)",
    duration: "1-2 Years",
    intake: "Annual",
    tag: "TC-PS",
    description: "Foundational to intermediate training in police science and law enforcement",
    details: [
      "Basic police administration and procedures",
      "Criminal law and human rights",
      "Community policing and ethics",
      "Physical fitness and self-defense",
      "Introduction to criminal investigation",
      "Practical field training",
    ],
    color: "#1e40af",  // Blue dominant
  },
  {
    id: 2,
    icon: <Radio />,
    title: "Charge Room Office Course",
    duration: "3-6 Months",
    intake: "Multiple",
    tag: "CRC",
    description: "Specialized training for charge room operations and station management",
    details: [
      "Occurrence book and station diary management",
      "Case registration and filing procedures",
      "Bail and custody handling",
      "Report writing and communication",
      "Shift coordination and handover",
      "Basic legal documentation",
    ],
    color: "#0f766e",  // Teal/greenish for operational feel
  },
  {
    id: 3,
    icon: <Car />,
    title: "Traffic Course",
    duration: "3-6 Months",
    intake: "Multiple",
    tag: "TRF",
    description: "Professional training in traffic control, enforcement and road safety",
    details: [
      "Traffic laws and regulations",
      "Vehicle inspection and roadworthiness",
      "Accident scene management",
      "Speed enforcement and radar operation",
      "Public education on road safety",
      "Defensive driving for traffic officers",
    ],
    color: "#dc2626",  // Red for traffic/alert
  },
  {
    id: 4,
    icon: <Users />,
    title: "Auxiliary Police Courses",
    duration: "3-12 Months",
    intake: "As Scheduled",
    tag: "AUX",
    description: "Training for auxiliary/reserve police personnel and community support",
    details: [
      "Basic law enforcement duties",
      "Crowd control and public order",
      "Community engagement and patrol",
      "First aid and emergency response",
      "Discipline and code of conduct",
      "Support to regular police operations",
    ],
    color: "#9333ea",  // Purple for support/auxiliary
  },
  {
    id: 5,
    icon: <Car />,
    title: "Driving Courses (Class A, B1, C, D)",
    duration: "1-6 Months",
    intake: "Multiple",
    tag: "DRV",
    description: "Certification for various classes of police and emergency vehicle driving",
    details: [
      "Defensive and advanced driving techniques",
      "Vehicle handling in different conditions",
      "Emergency response driving",
      "Traffic laws and road signs",
      "Vehicle maintenance basics",
      "Pursuit and tactical driving (advanced classes)",
    ],
    color: "#6366f1",  // Indigo for driving/mobility
  },
];

const AdmissionRequirement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
      setIsAutoPlaying(false);
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
      setIsAutoPlaying(false);
    }
  };

  // Get visible cards (prev, current, next)
  const getVisibleCards = () => {
    const prevIndex = (currentIndex - 1 + programs.length) % programs.length;
    const nextIndex = (currentIndex + 1) % programs.length;
    return [prevIndex, currentIndex, nextIndex];
  };

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

      {/* Programs Carousel Section */}
      <div className="programs-section">
        <div className="section-header">
          <Target size={32} />
          <h2>OUR PROGRAMS</h2>
          <p>Explore our comprehensive range of training programs designed to develop professional excellence</p>
        </div>

        <div 
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button 
            className="carousel-nav carousel-nav-prev" 
            onClick={prevSlide}
            aria-label="Previous program"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            className="carousel-nav carousel-nav-next" 
            onClick={nextSlide}
            aria-label="Next program"
          >
            <ChevronRight size={32} />
          </button>

          {/* Cards Container */}
          <div className="carousel-track">
            {programs.map((program, index) => {
              const visibleCards = getVisibleCards();
              const position = visibleCards.indexOf(index);
              
              let cardClass = "carousel-card";
              if (position === 0) cardClass += " carousel-card-prev";
              else if (position === 1) cardClass += " carousel-card-active";
              else if (position === 2) cardClass += " carousel-card-next";
              else cardClass += " carousel-card-hidden";

              return (
                <div
                  key={program.id}
                  className={cardClass}
                  style={{ "--card-color": program.color }}
                >
                  <div className="card-accent"></div>
                  
                  <div className="card-icon-large">
                    {program.icon}
                  </div>

                  <div className="card-tag">{program.tag}</div>

                  <h3 className="card-title">{program.title}</h3>
                  <p className="card-description">{program.description}</p>

                  <div className="card-meta-inline">
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{program.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{program.intake}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-apply"
                      onClick={() => window.open('https://dpa.tpf.go.tz/apply', '_blank')}
                    >
                      APPLY NOW
                      <ChevronRight size={18} />
                    </button>
                    <button className="btn-learn">
                      <span className="info-icon">●</span>
                      LEARN MORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="carousel-pagination">
            {programs.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to program ${index + 1}`}
              />
            ))}
          </div>
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
            <button 
              className="btn-primary"
              onClick={() => window.open('https://dpa.tpf.go.tz/apply', '_blank')}
            >
              Apply Now
            </button>
            <button className="btn-secondary">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionRequirement;
