// src/pages/Admission/Recreation.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Recreation() {
  // Static content
  const activities = [
    {
      title: "Sports Facilities",
      description:
        "Extensive sports facilities including football, basketball, volleyball courts, and indoor gyms to promote physical fitness and teamwork.",
      icon: "🏀",
    },
    {
      title: "Outdoor Activities",
      description:
        "Obstacle courses, hiking, tactical drills, and team-building exercises designed to enhance endurance, coordination, and problem-solving skills.",
      icon: "🌲",
    },
    {
      title: "Clubs & Societies",
      description:
        "Various clubs such as photography, music, chess, and debate foster creativity, leadership, and social interaction.",
      icon: "🎵",
    },
    {
      title: "Cultural & Social Events",
      description:
        "Talent shows, festivals, and competitions allow students to engage socially, build confidence, and showcase talents.",
      icon: "🎭",
    },
    {
      title: "Relaxation & Wellness",
      description:
        "Quiet areas, meditation spaces, and recreational lounges are available for relaxation, reading, and mental wellness during free hours.",
      icon: "🛋️",
    },
  ];

  // Concise summary for the right column
  const summary = `
    The academy offers a diverse and engaging range of recreational activities designed to support the physical, mental, and social development of students. 
    Sports facilities such as football fields, basketball courts, volleyball courts, and indoor gyms encourage physical fitness, teamwork, and discipline. 
    Outdoor activities, including obstacle courses, hiking, and tactical exercises, help develop endurance, coordination, and problem-solving skills in challenging environments. 
    Students can also join clubs and societies ranging from music, photography, and debate to chess and creative arts, fostering leadership, creativity, and collaborative skills. 
    Cultural and social events, such as talent shows, festivals, and competitions, allow students to showcase their talents, build confidence, and strengthen interpersonal connections. 
    Additionally, quiet areas, meditation spaces, and recreational lounges are available for relaxation and mental wellness, ensuring a balanced and holistic approach to student development. 
    These recreation programs aim to cultivate well-rounded individuals, ready to excel academically, socially, and physically while fostering a vibrant and inclusive campus community.
  `;

  return (
    <div className="recreation-page">
      <style>{`
        .recreation-section {
          background: #ffffff;
          padding: 80px 0;
        }
        .recreation-wrapper {
          min-height: 500px;
        }
        .recreation-title {
          font-size: 38px;
          font-weight: 700;
          color: #0b2c3d;
          margin-bottom: 20px;
          text-align: center;
        }
        .recreation-text {
          font-size: 16px;
          line-height: 1.8;
          color: #6c757d;
          margin-bottom: 18px;
        }
        .recreation-carousel {
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
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
        }

        /* ===== CARDS SECTION ===== */
        .cards-section {
          background: #f8fafc;
          padding: 70px 0;
        }
        .cards-title {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 50px;
          color: #0b2c3d;
        }
        .card {
          background: #fff;
          border-radius: 14px;
          padding: 25px 20px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .card-icon {
          font-size: 42px;
          margin-bottom: 18px;
          color: #1e40af;
        }
        .card-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0b2c3d;
        }
        .card-text {
          font-size: 15px;
          color: #6c757d;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .recreation-title {
            font-size: 30px;
          }
        }
      `}</style>

      {/* ===== MAIN RECREATION SECTION ===== */}
      <section className="recreation-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <h1 className="recreation-title">Recreation & Activities</h1>
          <div className="row g-3 recreation-wrapper">
            {/* LEFT: Carousel */}
            <div className="col-lg-6 h-100">
              <div className="recreation-carousel">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                >
                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/recreation1.jpg" alt="Sports" />
                      <div className="image-caption">Football, basketball, and indoor gyms</div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/recreation2.jpg" alt="Outdoor activities" />
                      <div className="image-caption">Obstacle courses, hiking, and team-building</div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/recreation2.jpg" alt="Cultural events" />
                      <div className="image-caption">Talent shows, festivals, and social events</div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* RIGHT: Summary */}
            <div className="col-lg-6">
              <p className="recreation-text">{summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARDS SECTION ===== */}
      <section className="cards-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <h2 className="cards-title">Activities Overview</h2>
          <div className="row g-4">
            {activities.map((act, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card">
                  <div className="card-icon">{act.icon}</div>
                  <h4 className="card-title">{act.title}</h4>
                  <p className="card-text">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
