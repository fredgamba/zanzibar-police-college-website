import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { Award } from "react-feather";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HeroCommandant.css"; // import the CSS we defined earlier

export default function HeroCommandant() {
  const cardRef = useRef(null);

  // Initialize VanillaTilt for 3D tilt effect
  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.4,
      });
    }

    // Initialize AOS animations
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <section className="hero-commandant">
      {/* Video Background */}
      <video
        className="hero-video"
        src="/videos/campus-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay & Floating Shapes */}
      <div className="hero-overlay"></div>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>

      {/* Hero Card with 3D tilt */}
      <div className="container">
        <div ref={cardRef} className="hero-card">
          {/* Commandant Image */}
          <div className="hero-image" data-aos="fade-right">
            <img
              src="/images/mambosasa.jpg"
              alt="Dr. Lazaro B. Mambosasa-DCP - Commandant"
            />
            <div className="commandant-badge">
              <Award size={24} />
            </div>
          </div>

          {/* Commandant Message */}
          <div className="hero-message" data-aos="fade-left">
            <span className="section-tag">Leadership Message</span>

            <h1>
              <span className="typing-text">
                Shaping Officers of Integrity & Excellence
              </span>
            </h1>

            <blockquote>
              “At Dar es Salaam Police Academy, we shape officers of integrity
              and excellence. Our commitment extends beyond academic
              excellence to character building, ensuring our graduates serve
              with honor, courage, and unwavering dedication to justice.”
            </blockquote>

            <div className="commandant-info">
              <h3>Dr. Lazaro B. Mambosasa, DCP</h3>
              <p>Deputy Commissioner of Police · Commandant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
