import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function DrivingSchool() {
  const [features, setFeatures] = useState([]);
  const [features2, setFeatures2] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch features (small features on welcome section)
    api.get('/driving-features')
      .then(res => setFeatures(res.data))
      .catch(() => {
        setFeatures([
          { title: "Accredited Training Institution", text: "DPA Driving School operates as a fully accredited institution, providing certified and regulated driver training programs." },
          { title: "Learner-Focused Instruction", text: "Training programs are designed using structured lesson plans that support individual learner progress and competency development." },
          { title: "Qualified Driving Instructors", text: "Instruction is provided by trained and experienced professionals committed to maintaining high standards of road safety." },
          { title: "Comprehensive Practical Training", text: "The curriculum integrates theoretical knowledge with practical driving experience to ensure road readiness and compliance." },
        ]);
      });

    // Set features2 (main cards in 'Why Choose Us' section)
    setFeatures2([
      {
        title: "Top Safety Measures",
        text: "Safety is our priority. At DPA Driving School, we follow strict safety protocols, provide expert guidance, and teach defensive driving techniques to ensure every student drives with confidence and care."
      },
      {
        title: "Perfect Timing for Your Driving Journey",
        text: "At DPA Driving School, we ensure every lesson is scheduled perfectly to fit your needs, helping you learn at your own pace and convenience."
      },
      {
        title: "Affordable Driving Lessons",
        text: "At DPA Driving School, we offer high-quality driving education at prices that fit your budget, making safe driving accessible to all."
      },
      {
        title: "Our Experts",
        text: "At DPA Driving School, our certified instructors bring years of experience and a passion for teaching, ensuring you gain the skills and confidence to drive safely."
      },

    ]);

    // Fetch images
    api.get('/driving-images')
      .then(res => setImages(res.data))
      .catch(() => {
        setImages([{ src: '/images/driving.jpeg', alt: 'DPA Driving School Training Session' }]);
      });
  }, []);

  return (
    <div className="driving-school-page">

      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        .welcome-section { padding: 60px 0; background: #ffffff; }
        .wide-container { padding-left: 40px; padding-right: 40px; }
        .welcome-images { position: relative; }
        .circle-bg { position: absolute; width: 280px; height: 280px; border: 1px solid #dddddd; border-radius: 50%; top: -40px; left: -40px; }
        .image-box { border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative; z-index: 2; margin-bottom: 15px; transition: transform 0.3s ease; }
        .image-box img { width: 100%; display: block; }
        .image-box:hover img { transform: scale(1.05); }
        .welcome-title { font-size: 42px; font-weight: 700; margin-bottom: 15px; color: #111111; }
        .welcome-text { color: #6c757d; line-height: 1.7; margin-bottom: 30px; max-width: 680px; }
        .feature-item { display: flex; gap: 12px; }
        .feature-icon { width: 24px; height: 24px; border: 1px solid #0d6efd; color: #0d6efd; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
        .feature-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: left; display: flex; flex-direction: column; gap: 12px; height: 100%; }
        .feature-card .feature-icon { font-size: 28px; width: 50px; height: 50px; border-radius: 50%; background: #001f3f; color: #ff4136; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .feature-card h6 { font-weight: 700; font-size: 16px; margin-bottom: 6px; }
        .feature-card p { font-size: 14px; color: #6c757d; }
        @media (max-width: 768px) { 
          .wide-container { padding-left: 20px; padding-right: 20px; } 
          .welcome-title { font-size: 32px; } 
          .circle-bg { width: 180px; height: 180px; top: -20px; left: -20px; } 
        }
      `}</style>

      {/* ===== WELCOME SECTION ===== */}
      <section className="welcome-section">
        <div className="container-fluid wide-container">
          <div className="row align-items-center g-3">

            {/* LEFT SIDE: IMAGES */}
            <div className="col-lg-6">
              <div className="welcome-images">
                <div className="circle-bg"></div>
                {images.map((img, idx) => (
                  <div className="image-box w-70" key={idx}>
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: TEXT + SMALL FEATURES */}
            <div className="col-lg-6">
              <h1 className="welcome-title">
                Welcome to DPA <br /> Driving School
              </h1>

              <p className="welcome-text">
                DPA Driving School is a professionally accredited driving institution
                dedicated to the development of competent, disciplined, and responsible
                drivers. Through structured training programs, experienced instructors,
                and well-maintained training vehicles, the school delivers high-quality
                driving education in accordance with established safety and regulatory
                standards.
              </p>

              <div className="row g-3">
                {features.map((feature, idx) => (
                  <div className="col-md-6" key={idx}>
                    <Feature title={feature.title} text={feature.text} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FEATURE CARDS SECTION (features2) ===== */}
      <section className="feature-cards-section py-5" style={{ background: '#f8f9fa' }}>
        <div className="container-fluid wide-container">
          <h2 className="mb-4" style={{ fontWeight: 700, textAlign: 'center' }}>Why Choose Us</h2>
          <div className="row g-4">
            {features2.map((feature, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={idx}>
                <div className="feature-card" style={{ minHeight: '220px' }}>
                  <h6>{feature.title}</h6>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ===== FEATURE COMPONENT =====
function Feature({ title, text, icon = "✓" }) {
  return (
    <div className="feature-item">
      <div className="feature-icon">{icon}</div>
      <div>
        <h6 className="mb-1">{title}</h6>
        <p className="text-muted mb-0 small">{text}</p>
      </div>
    </div>
  );
}