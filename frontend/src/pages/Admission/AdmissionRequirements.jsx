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
} from "lucide-react";

import "./AdmissionRequirements.css";

const programs = [
  {
    id: 1,
    icon: <GraduationCap />,
    title: "Diploma Program",
    duration: "2-3 Years",
    intake: "Annual",
    tag: "OD-PS",
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
    tag: "TC-LAW",
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
    title: "Certificate in Laboratory Technician",
    duration: "1 Year",
    intake: "Annual",
    tag: "TC-MLB",
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
    tag: "PROMO",
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
    title: "Other Programs",
    duration: "Flexible",
    intake: "On Demand",
    tag: "OTHER",
    description: "Tailored training for specific organizational needs",
    details: [
      "Stakeholder collaboration",
      "Customized curriculum",
      "Flexible scheduling",
      "Corporate training available",
    ],
    color: "#ea580c",
  },
  {

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
