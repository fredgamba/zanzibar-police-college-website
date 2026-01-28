import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SportGym() {
  const data = {
    sports: [
      {
        title: "Football",
        description:
          "Our football facilities include a full-sized pitch, training equipment, and regular coaching sessions to enhance skills and teamwork.",
        photo: "/images/sports.jpg",
      },
      {
        title: "Basketball",
        description:
          "We have indoor and outdoor basketball courts available for practice and competitive games, along with professional coaching staff.",
        photo: "/images/sports.jpg",
      },
      {
        title: "Volleyball",
        description:
          "Our volleyball courts are equipped for both recreational play and competitive matches, with training programs for all skill levels.",
        photo: "/images/sports.jpg",
      },
    ],
    gym: [
      {
        title: "Cardio Equipment",
        description:
          "Our gym features state-of-the-art cardio machines including treadmills, ellipticals, and stationary bikes to help improve cardiovascular health.",
        photo: "/images/gym1.jpg",
      },
      {
        title: "Strength Training",
        description:
          "We offer a variety of strength training equipment such as free weights, resistance machines, and functional training tools to build muscle and endurance.",
        photo: "/images/gym2.jpg",
      },

    ],
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <div style={{ padding: "2%" }}>
    <div>
      <h2>Sports & Gym</h2><br />
      <blockquote>
        &nbsp; Dar-es-Salam police Academy (DPA) has a comprehensive sports and fitness program designed to promote physical wellness and team spirit among cadets.
        Our facilities include well-maintained sports fields, courts, and a fully equipped gymnasium. We offer training and recreational activities in various sports such as football, basketball, volleyball, and more.
        The gym is outfitted with modern equipment for strength training, cardio workouts, and overall fitness. Regular fitness assessments and training sessions are conducted to ensure cadets meet the physical standards required for their roles.
        Participation in sports and fitness activities is encouraged as part of our holistic approach to cadet development, fostering discipline, resilience, and camaraderie.
      </blockquote><br/>
    </div>
      <div className="hero-section">
        {/* LEFT: Sports Carousel */}
        <div className="hero-left">
          <Slider {...settings}>
            {data.sports.map((sport, index) => (
              <div key={index} className="hero-slide">
                <img src={sport.photo} alt={sport.title} />
                <div className="slide-title">{sport.title}</div>
                <div className="slide-description">{sport.description}</div>
              </div>
            ))}
          </Slider>
        </div>

        {/* RIGHT: Gym Latest 2 */}
        <div className="hero-right">
          {data.gym.slice(-2).map((gym, index) => (
            <div key={index} className="gym-card">
              <img src={gym.photo} alt={gym.title} />
              <div className="gym-title">{gym.title}</div>
              <div className="gym-description">{gym.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .hero-section {
          display: flex;
          gap: 20px;
          width: 100%;
        }

        /* LEFT: Sports Carousel */
        .hero-left {
          width: 70%;
          height: 100%;
          position: relative;
        }

        .hero-slide {
          position: relative;
          height: 450px;
          overflow: hidden;
          border-radius: 8px;
        }

        .hero-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slide-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 15px;
          font-size: 24px;
          font-weight: bold;
        }

        .slide-description {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 15px;
          font-size: 16px;
        }

        /* RIGHT: Gym Cards */
        .hero-right {
          width: 30%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .gym-card {
          position: relative;
          height: calc(50% - 10px);
          overflow: hidden;
          border-radius: 8px;
        }

        .gym-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gym-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
          font-weight: bold;
        }

        .gym-description {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
        }

        /* Responsive: Mobile */
        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            height: auto;
          }

          .hero-left,
          .hero-right {
            width: 100%;
          }

          .gym-card {
            height: 200px;
          }

          .hero-slide {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
