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
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const data = {
    sports: [
      {
        title: "Football",
        tag: "Team Sport",
        description:
          "Full-sized pitch with professional coaching sessions to enhance skills and teamwork among cadets.",
        photo: "/images/sports.jpg",
      },
      {
        title: "Basketball",
        tag: "Indoor & Outdoor",
        description:
          "Indoor and outdoor courts available for practice and competitive games with professional coaching staff.",
        photo: "/images/sports.jpg",
      },
      {
        title: "Volleyball",
        tag: "All Skill Levels",
        description:
          "Equipped courts for both recreational play and competitive matches with training programs for all levels.",
        photo: "/images/sports.jpg",
      },
    ],
    gym: [
      {
        title: "Cardio Equipment",
        icon: "🏃",
        description:
          "State-of-the-art treadmills, ellipticals, and stationary bikes for cardiovascular health.",
        photo: "/images/gym1.jpg",
      },
      {
        title: "Strength Training",
        icon: "💪",
        description:
          "Free weights, resistance machines, and functional training tools to build muscle and endurance.",
        photo: "/images/gym2.jpg",
      },
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sg-page {
          font-family: 'DM Sans', sans-serif;
          background: #f4f6f9;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .sg-hero {
          position: relative;
          height: 420px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        /* All background slides stacked */
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
          transform: scale(1.06);
          transition: opacity 1.4s ease, transform 7s ease;
        }

        .sg-hero-bg-slide.active {
          opacity: 1;
          transform: scale(1);
        }

        /* Dark gradient overlay — stronger at bottom for text readability */
        .sg-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(11, 31, 58, 0.75) 0%,
            rgba(11, 31, 58, 0.35) 45%,
            rgba(11, 31, 58, 0.15) 100%
          );
          z-index: 1;
        }

        .sg-hero-content {
          position: relative;
          z-index: 3;
          padding: 2.5rem 3rem;
          color: white;
          width: 100%;
        }

        .sg-hero-tag {
          display: inline-block;
          background: #c8a84b;
          color: #0b1f3a;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 2px;
          margin-bottom: 1rem;
        }

        .sg-hero-content h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          line-height: 1;
          letter-spacing: 3px;
          margin: 0 0 0.75rem;
          color: white;
        }

        .sg-hero-content h1 span { color: #c8a84b; }

        .sg-hero-content p {
          font-size: 1rem;
          color: rgba(255,255,255,0.82);
          max-width: 560px;
          line-height: 1.6;
          margin: 0 0 1.2rem;
        }

        /* Dot indicators for hero slides */
        .sg-hero-dots {
          display: flex;
          gap: 8px;
          margin-top: 0.5rem;
        }

        .sg-hero-dot {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          padding: 0;
        }

        .sg-hero-dot.active {
          background: #c8a84b;
          width: 40px;
        }

        /* STATS STRIP */
        .sg-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #0b1f3a;
        }

        .sg-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.4rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }

        .sg-stat:last-child { border-right: none; }
        .sg-stat:hover { background: rgba(200,168,75,0.1); }

        .sg-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #c8a84b;
          line-height: 1;
        }

        .sg-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* BODY */
        .sg-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        /* SECTION LABELS */
        .sg-section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #0b1f3a;
          margin-bottom: 0.4rem;
        }

        .sg-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #0b1f3a;
          flex-shrink: 0;
        }

        .sg-dot-gold { background: #c8a84b; }

        .sg-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: #0b1f3a;
          letter-spacing: 2px;
          margin: 0 0 2rem;
        }

        /* SPORTS LAYOUT */
        .sg-sports-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 24px;
          align-items: start;
        }

        .sg-carousel-wrap {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(11,31,58,0.18);
        }

        .sg-slide {
          position: relative;
          height: 460px;
          overflow: hidden;
        }

        .sg-slide img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 6s ease;
        }

        .sg-carousel-wrap:hover .sg-slide img { transform: scale(1.05); }

        .sg-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.2) 50%, transparent 100%);
        }

        .sg-slide-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 2rem;
          color: white;
        }

        .sg-slide-tag {
          display: inline-block;
          background: #c8a84b;
          color: #0b1f3a;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 0.6rem;
        }

        .sg-slide-info h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.4rem;
          letter-spacing: 2px;
          margin: 0 0 0.5rem;
          color: white;
        }

        .sg-slide-info p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.5;
          margin: 0;
        }

        .sg-carousel-wrap .slick-dots { bottom: 16px; }
        .sg-carousel-wrap .slick-dots li button:before {
          color: white; opacity: 0.5; font-size: 8px;
        }
        .sg-carousel-wrap .slick-dots li.slick-active button:before {
          color: #c8a84b; opacity: 1;
        }

        /* Sports sidebar */
        .sg-sports-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sg-sport-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: white;
          border-radius: 12px;
          padding: 1rem 1.2rem;
          box-shadow: 0 4px 16px rgba(11,31,58,0.06);
          border-left: 3px solid #0b1f3a;
          transition: all 0.25s ease;
          cursor: default;
        }

        .sg-sport-item:hover {
          transform: translateX(4px);
          border-left-color: #c8a84b;
          box-shadow: 0 6px 20px rgba(11,31,58,0.1);
        }

        .sg-sport-more { border-left-color: #c8a84b; background: #fffbf0; }
        .sg-sport-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          color: #c8a84b;
          line-height: 1;
          min-width: 32px;
        }

        .sg-sport-name { font-weight: 600; color: #0b1f3a; font-size: 0.95rem; }
        .sg-sport-tag { font-size: 0.75rem; color: #6b7280; margin-top: 2px; }

        /* GYM LAYOUT */
        .sg-gym-layout {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .sg-gym-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(11,31,58,0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .sg-gym-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(11,31,58,0.14);
        }

        .sg-gym-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .sg-gym-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sg-gym-card:hover .sg-gym-img-wrap img { transform: scale(1.06); }

        .sg-gym-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(11,31,58,0.5) 100%);
        }

        .sg-gym-icon {
          position: absolute;
          bottom: 14px; right: 14px;
          font-size: 1.8rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }

        .sg-gym-body { padding: 1.4rem; flex: 1; }

        .sg-gym-body h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 1px;
          color: #0b1f3a;
          margin: 0 0 0.5rem;
        }

        .sg-gym-body p { font-size: 0.88rem; color: #5a6472; line-height: 1.6; margin: 0; }

        /* Promo card */
        .sg-gym-promo {
          background: linear-gradient(135deg, #0b1f3a 0%, #1c3a6e 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(11,31,58,0.25);
        }

        .sg-gym-promo-inner { text-align: center; color: white; }
        .sg-gym-promo-icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }

        .sg-gym-promo-inner h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 1.5px;
          color: #c8a84b;
          margin: 0 0 0.8rem;
        }

        .sg-gym-promo-inner p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin: 0 0 1.2rem;
        }

        .sg-gym-promo-badges { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }

        .sg-gym-promo-badges span {
          background: rgba(200,168,75,0.2);
          border: 1px solid rgba(200,168,75,0.5);
          color: #c8a84b;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .sg-gym-layout { grid-template-columns: 1fr 1fr; }
          .sg-gym-promo { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .sg-hero { height: 320px; }
          .sg-hero-content { padding: 1.5rem; }
          .sg-hero-content h1 { font-size: 3.5rem; }
          .sg-stats { grid-template-columns: repeat(2, 1fr); }
          .sg-stat:nth-child(2) { border-right: none; }
          .sg-body { padding: 2rem 1rem 3rem; gap: 3rem; }
          .sg-sports-layout { grid-template-columns: 1fr; }
          .sg-slide { height: 320px; }
          .sg-gym-layout { grid-template-columns: 1fr; }
          .sg-gym-promo { grid-column: span 1; }
        }
      `}</style>

      <div className="sg-page">

        {/* ── HERO with sliding background ── */}
        <div className="sg-hero">

          {/* Background slides */}
          <div className="sg-hero-bg">
            {heroImages.map((img, i) => (
              <div
                key={i}
                className={`sg-hero-bg-slide ${i === currentHero ? "active" : ""}`}
                style={{ backgroundImage: `url('${img}')` }}
              />
            ))}
          </div>

          {/* Dark overlay */}
          <div className="sg-hero-overlay" />

          {/* Faint fade at bottom into page */}

          {/* Content */}
          <div className="sg-hero-content">
            <span className="sg-hero-tag">Facilities</span>
            <h1>Sports <span>&</span> Gym</h1>
            <p>
              A comprehensive program designed to promote physical wellness,
              discipline, and team spirit among cadets at Dar es Salaam Police Academy.
            </p>
            {/* Slide indicator dots */}
            <div className="sg-hero-dots">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  className={`sg-hero-dot ${i === currentHero ? "active" : ""}`}
                  onClick={() => setCurrentHero(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="sg-stats">
          {[
            { num: "5+",    label: "Sports Disciplines" },
            { num: "2",     label: "Gym Halls" },
            { num: "Daily", label: "Training Sessions" },
            { num: "100%",  label: "Cadet Participation" },
          ].map((s, i) => (
            <div className="sg-stat" key={i}>
              <span className="sg-stat-num">{s.num}</span>
              <span className="sg-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="sg-body">

          {/* SPORTS SECTION */}
          <section className="sg-section">
            <div className="sg-section-label">
              <span className="sg-dot" /> Sports Programme
            </div>
            <h2 className="sg-section-title">Competitive Sports</h2>
            <div className="sg-sports-layout">
              <div className="sg-carousel-wrap">
                <Slider {...settings}>
                  {data.sports.map((sport, i) => (
                    <div key={i}>
                      <div className="sg-slide">
                        <img src={sport.photo} alt={sport.title} />
                        <div className="sg-slide-overlay" />
                        <div className="sg-slide-info">
                          <span className="sg-slide-tag">{sport.tag}</span>
                          <h3>{sport.title}</h3>
                          <p>{sport.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="sg-sports-list">
                {data.sports.map((sport, i) => (
                  <div className="sg-sport-item" key={i}>
                    <div className="sg-sport-num">0{i + 1}</div>
                    <div>
                      <div className="sg-sport-name">{sport.title}</div>
                      <div className="sg-sport-tag">{sport.tag}</div>
                    </div>
                  </div>
                ))}
                <div className="sg-sport-item sg-sport-more">
                  <div className="sg-sport-num">+</div>
                  <div>
                    <div className="sg-sport-name">More Sports</div>
                    <div className="sg-sport-tag">Athletics, Swimming & more</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GYM SECTION */}
          <section className="sg-section">
            <div className="sg-section-label">
              <span className="sg-dot sg-dot-gold" /> Fitness Centre
            </div>
            <h2 className="sg-section-title">Modern Gymnasium</h2>
            <div className="sg-gym-layout">
              {data.gym.map((item, i) => (
                <div className="sg-gym-card" key={i}>
                  <div className="sg-gym-img-wrap">
                    <img src={item.photo} alt={item.title} />
                    <div className="sg-gym-img-overlay" />
                    <span className="sg-gym-icon">{item.icon}</span>
                  </div>
                  <div className="sg-gym-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="sg-gym-promo">
                <div className="sg-gym-promo-inner">
                  <span className="sg-gym-promo-icon">🏅</span>
                  <h3>Train Like a Professional</h3>
                  <p>
                    Regular fitness assessments ensure every cadet meets the
                    physical standards required for their role.
                  </p>
                  <div className="sg-gym-promo-badges">
                    <span>Strength</span>
                    <span>Cardio</span>
                    <span>Endurance</span>
                    <span>Agility</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
