import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SportGym() {
  const heroImages = [
    "/images/sports.jpg",
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/sports2.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const data = {
    sports: [
      { title: "Football", tag: "Team Discipline", description: "Professional pitch training focused on strategy, fitness & unity.", photo: "/images/sports.jpg" },
      { title: "Basketball", tag: "Agility & Teamwork", description: "Multi-court facilities for skill drills and competitive play.", photo: "/images/sports.jpg" },
      { title: "Volleyball", tag: "Coordination Focus", description: "Dedicated courts with progressive training for all levels.", photo: "/images/sports.jpg" },
    ],
    gym: [
      { title: "Cardio Area", icon: "🏃‍♂️", description: "High-end machines for cardiovascular conditioning & stamina.", photo: "/images/gym1.jpg" },
      { title: "Strength Zone", icon: "💪", description: "Comprehensive weights & resistance equipment for power building.", photo: "/images/gym2.jpg" },
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Condensed:wght@700&display=swap');

        :root {
          --bg:        #f9fafb;
          --navy:      #0f2942;
          --teal:      #0d9488;
          --gray:      #374151;
          --gray-light:#6b7280;
          --border:    #e5e7eb;
          --white:     #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sg-page {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg);
          color: var(--gray);
          line-height: 1.6;
        }

        /* ── HERO ── */
        .sg-hero {
          position: relative;
          height: clamp(60vh, 85vh, 90vh);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          overflow: hidden;
        }

        .sg-hero-bg {
          position: absolute;
          inset: 0;
        }

        .sg-hero-bg-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 2s ease;
        }

        .sg-hero-bg-slide.active { opacity: 1; }

        .sg-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,41,66,0.45) 0%, rgba(15,41,66,0.65) 100%);
          z-index: 1;
        }

        .sg-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          padding: 2rem 1.5rem;
        }

        .sg-hero-tag {
          font-size: clamp(0.9rem, 2.5vw, 1.1rem);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 1rem;
        }

        .sg-hero h1 {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          line-height: 0.9;
          margin-bottom: 1.5rem;
        }

        .sg-hero p {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          max-width: 720px;
          margin: 0 auto 2.5rem;
          opacity: 0.95;
        }

        .sg-stats-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .sg-stat {
          text-align: center;
        }

        .sg-stat-num {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--teal);
          line-height: 1;
        }

        .sg-stat-label {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── BODY ── */
        .sg-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 6rem) 1.5rem;
        }

        .sg-section {
          margin-bottom: clamp(4rem, 8vw, 8rem);
        }

        .sg-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .sg-section-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--teal);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .sg-section-title {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: var(--navy);
        }

        /* Sports Grid */
        .sg-sports-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 992px) {
          .sg-sports-grid { grid-template-columns: 2fr 1fr; }
        }

        .sg-carousel {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .sg-slide {
          position: relative;
          height: clamp(320px, 50vw, 500px);
        }

        .sg-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sg-slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem 2rem;
          background: linear-gradient(to top, rgba(15,41,66,0.85), transparent);
          color: white;
        }

        .sg-slide-tag {
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--teal);
          color: white;
          padding: 0.4em 1em;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .sg-slide h3 {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          margin-bottom: 0.8rem;
        }

        .sg-sidebar-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .sg-sidebar-item {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .sg-sidebar-item:hover {
          border-color: var(--teal);
          transform: translateY(-4px);
        }

        .sg-sidebar-num {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 2.2rem;
          color: var(--teal);
          margin-bottom: 0.3rem;
        }

        .sg-sidebar-name {
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--navy);
        }

        .sg-sidebar-tag {
          font-size: 0.9rem;
          color: var(--gray-light);
        }

        /* Gym Cards */
        .sg-gym-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.8rem;
        }

        @media (min-width: 768px) { .sg-gym-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .sg-gym-grid { grid-template-columns: repeat(3, 1fr); } }

        .sg-gym-card {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .sg-gym-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }

        .sg-gym-img {
          height: clamp(200px, 35vw, 260px);
          position: relative;
        }

        .sg-gym-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sg-gym-icon {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          font-size: 3.5rem;
          color: rgba(255,255,255,0.85);
        }

        .sg-gym-info {
          padding: 1.8rem;
        }

        .sg-gym-info h3 {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 1.8rem;
          color: var(--navy);
          margin-bottom: 0.8rem;
        }

        .sg-gym-info p {
          color: var(--gray-light);
        }
      `}</style>

      <div className="sg-page">

        <div className="sg-hero">
          <div className="sg-hero-bg">
            {heroImages.map((img, i) => (
              <div
                key={i}
                className={`sg-hero-bg-slide ${i === currentHero ? "active" : ""}`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
          <div className="sg-hero-overlay" />

          <div className="sg-hero-inner">
            <div className="sg-hero-tag">Zanzibar Police College</div>
            <h1>Sports & Fitness Training</h1>
            <p>Developing physical excellence, mental resilience, and disciplined teamwork for future officers.</p>

            <div className="sg-stats-bar">
              <div className="sg-stat">
                <div className="sg-stat-num">6+</div>
                <div className="sg-stat-label">Disciplines</div>
              </div>
              <div className="sg-stat">
                <div className="sg-stat-num">Daily</div>
                <div className="sg-stat-label">Sessions</div>
              </div>
              <div className="sg-stat">
                <div className="sg-stat-num">100%</div>
                <div className="sg-stat-label">Participation</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sg-body">

          <section className="sg-section">
            <div className="sg-section-header">
              <div className="sg-section-label">Core Programme</div>
              <h2 className="sg-section-title">Competitive Sports</h2>
            </div>

            <div className="sg-sports-grid">
              <div className="sg-carousel">
                <Slider {...settings}>
                  {data.sports.map((sport, i) => (
                    <div key={i}>
                      <div className="sg-slide">
                        <img src={sport.photo} alt={sport.title} />
                        <div className="sg-slide-content">
                          <span className="sg-slide-tag">{sport.tag}</span>
                          <h3>{sport.title}</h3>
                          <p>{sport.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="sg-sidebar-list">
                {data.sports.map((sport, i) => (
                  <div className="sg-sidebar-item" key={i}>
                    <div className="sg-sidebar-num">0{i + 1}</div>
                    <div className="sg-sidebar-name">{sport.title}</div>
                    <div className="sg-sidebar-tag">{sport.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sg-section">
            <div className="sg-section-header">
              <div className="sg-section-label">Strength & Conditioning</div>
              <h2 className="sg-section-title">Gym Facilities</h2>
            </div>

            <div className="sg-gym-grid">
              {data.gym.map((item, i) => (
                <div className="sg-gym-card" key={i}>
                  <div className="sg-gym-img">
                    <img src={item.photo} alt={item.title} />
                    <span className="sg-gym-icon">{item.icon}</span>
                  </div>
                  <div className="sg-gym-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}