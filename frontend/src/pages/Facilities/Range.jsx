// src/pages/Admission/range.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Range() {
  return (
    <div className="range-page">
      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        .range-section {
          background: #ffffff;
          padding: 80px 0;
        }

        .range-wrapper {
          height: 560px;
        }

        .range-title {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #0b2c3d;
          text-align: center;
        }

        .range-text {
          color: #6c757d;
          line-height: 1.9;
          font-size: 17px;
          margin-bottom: 24px;
          text-align: justify;
        }

        .range-images {
          height: 100%;
        }

        .swiper {
          height: 100%;
        }

        .image-main {
          position: relative;
          height: 100%;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .image-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-caption {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          padding: 14px 18px;
          border-radius: 8px;
          font-size: 14px;
        }

        .range-wrapper .col-lg-5 {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        /* ===== WEAPON SKILLS SECTION ===== */
        .skills-section {
          background: #f8fafc;
          padding: 70px 0;
        }

        .skills-title {
          text-align: center;
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 50px;
          color: #0b2c3d;
        }

        .skill-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 30px 25px;
          text-align: center;
          height: 100%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .skill-icon {
          font-size: 42px;
          margin-bottom: 20px;
          color: #1e40af;
        }

        .skill-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0b2c3d;
        }

        .skill-text {
          font-size: 15px;
          color: #6c757d;
          line-height: 1.7;
        }

        /* ===== SHOOTING DRILLS & RANGE RULES SECTION ===== */
        .drills-section {
          background: #eef2ff;
          padding: 70px 0;
        }

        .drills-title {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 50px;
          color: #0b2c3d;
        }

        .drill-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 25px 20px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .drill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        .drill-icon {
          font-size: 40px;
          margin-bottom: 18px;
          color: #1e40af;
        }

        .drill-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0b2c3d;
        }

        .drill-text {
          font-size: 14px;
          color: #6c757d;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .range-title {
            font-size: 30px;
          }
        }
      `}</style>

      {/* ===== MAIN CONTENT ===== */}
      <section className="range-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <div className="row g-3 range-wrapper">

            {/* LEFT SIDE – CAROUSEL */}
            <div className="col-lg-6 h-100">
              <div className="range-images">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                >
                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/range1.jpg" alt="Field training" />
                      <div className="image-caption">
                        Fieldcraft training focusing on observation, concealment, and movement.
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/range2.jpg" alt="Weapon training" />
                      <div className="image-caption">
                        Weapon handling and tactical exercises in controlled environments.
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* RIGHT SIDE – TEXT */}
            <div className="col-lg-5">
              <h1 className="range-title"> RANGE</h1>

              <p className="range-text">
                The DPA Range provides structured training in field operations, military observation,
                and tactical movement. Trainees engage in realistic outdoor scenarios designed to
                develop discipline, awareness, and operational readiness.
              </p>

              <p className="range-text">
                Fieldcraft training covers ground appreciation, concealment techniques, judging
                distances, and recognizing targets. Movement is practiced both with and without
                arms, ensuring adaptability in various operational situations.
              </p>

              <p className="range-text">
                Emphasis is placed on safety, accuracy, and controlled engagement, ensuring that
                all training activities are conducted responsibly and professionally.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== WEAPON HANDLING & SKILLS ===== */}
      <section className="skills-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <h2 className="skills-title">Weapon Handling & Field Skills</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="skill-card">
                <div className="skill-icon">🔫</div>
                <h4 className="skill-title">Weapon Handling</h4>
                <p className="skill-text">
                  Proper handling of firearms including holding positions, loading,
                  unloading, and maintaining control at all times.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="skill-card">
                <div className="skill-icon">🛡️</div>
                <h4 className="skill-title">Weapon Safety</h4>
                <p className="skill-text">
                  Strict adherence to safety rules, safe directions, trigger discipline,
                  and awareness of surroundings during all exercises.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="skill-card">
                <div className="skill-icon">👁️</div>
                <h4 className="skill-title">Target Recognition</h4>
                <p className="skill-text">
                  Identification and description of targets using observation skills,
                  distance judgment, and environmental awareness.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="skill-card">
                <div className="skill-icon">🚶‍♂️</div>
                <h4 className="skill-title">Tactical Movement</h4>
                <p className="skill-text">
                  Movement techniques with and without arms, including cover usage,
                  concealment, and controlled advancement in the field.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="skill-card">
                <div className="skill-icon">📏</div>
                <h4 className="skill-title">Judging Distance</h4>
                <p className="skill-text">
                  Accurate estimation of distances using visual methods, terrain features,
                  and reference points essential for effective engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOOTING DRILLS & RANGE RULES ===== */}
      <section className="drills-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <h2 className="drills-title">Shooting Drills & Range Rules</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="drill-card">
                <div className="drill-icon">🎯</div>
                <h4 className="drill-title">Rifle Drills</h4>
                <p className="drill-text">
                  Precision shooting exercises with rifles to improve accuracy, sighting,
                  and control under varied conditions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="drill-card">
                <div className="drill-icon">🔫</div>
                <h4 className="drill-title">Pistol Drills</h4>
                <p className="drill-text">
                  Short-range target exercises focusing on speed, accuracy, and proper
                  handling techniques with pistols.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="drill-card">
                <div className="drill-icon">📏</div>
                <h4 className="drill-title">Precision Engagement</h4>
                <p className="drill-text">
                  Engaging static and moving targets while maintaining observation,
                  distance judgment, and tactical positioning.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="drill-card">
                <div className="drill-icon">⚠️</div>
                <h4 className="drill-title">Range Rules</h4>
                <p className="drill-text">
                  Enforcing safety protocols including clear lines of fire, personal
                  protective equipment, and supervised handling of all weapons.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="drill-card">
                <div className="drill-icon">🪖</div>
                <h4 className="drill-title">Instructor-led Training</h4>
                <p className="drill-text">
                  All exercises are conducted under expert supervision to guide,
                  correct, and ensure safety of all trainees during range activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}