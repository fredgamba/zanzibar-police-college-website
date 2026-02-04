// src/pages/Admission/Dispensary.jsx
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FaTooth, FaEye, FaBaby, FaHeartbeat } from 'react-icons/fa'; // Icons from react-icons

export default function Dispensary() {
  return (
    <div className="dispensary-page">
      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        .dispensary-section {
          padding: 70px 0;
          background: #ffffff;
        }

        .dispensary-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #0b2c3d;
          text-align: center; /* Center the title */
        }

        .dispensary-text {
          color: #6c757d;
          line-height: 1.9;
          font-size: 16px;
          margin-bottom: 24px;
          text-align: justify; /* Stretch text */
        }

        .dispensary-images {
          position: relative;
        }

        .image-main {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .image-main img {
          width: 100%;
          display: block;
        }

        .image-overlay {
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 220px;
          background: #48b2b7;
          color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .image-overlay h6 {
          margin: 0;
          font-weight: 700;
          font-size: 14px;
        }

        .image-overlay p {
          margin: 5px 0 0;
          font-size: 12px;
          line-height: 1.5;
        }

        /* Align right column text to top */
        .row .col-lg-5 {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        /* ===== SERVICES CARDS ===== */
        .services-section {
          background: #f9f9f9;
          padding: 60px 0 40px;
        }

        .service-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        .service-icon {
          font-size: 40px;
          color: #1e40af;
          margin-bottom: 20px;
        }

        .service-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0b2c3d;
        }

        .service-text {
          font-size: 14px;
          color: #6c757d;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .dispensary-title {
            font-size: 28px;
          }

          .service-card {
            margin-bottom: 30px;
          }
        }
      `}</style>

      {/* ===== CONTENT ===== */}
      <section className="dispensary-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <div className="row g-5">

            {/* LEFT SIDE – IMAGES */}
            <div className="col-lg-6">
              <div className="dispensary-images">
                <div className="image-main">
                  <img
                    src={"/images/dispensary.png"}
                    alt="DPA Dispensary"
                  />
                </div>

                <div className="image-overlay">
                  <h6>DPA DISPENSARY</h6>
                  <p>
                    A charitable public facility providing medical supplies,
                    treatment, and professional care.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE – TEXT */}
            <div className="col-lg-5">
              <h1 className="dispensary-title">DISPENSARY</h1>

              <p className="dispensary-text">
                The DPA Dispensary is a fully equipped medical facility at the Dar es Salaam Police Academy, dedicated to providing high-quality healthcare services for students, staff, and the academy community. It ensures timely access to medications, essential medical supplies, and professional healthcare support in a secure and organized environment.
              </p>

              <p className="dispensary-text">
                Our dispensary is designed for efficiency and safety. It maintains accurate records of prescriptions and medical supplies, supports multiple dispensing modules including manual and bulk dispensing, and integrates seamlessly with supervisory systems for oversight and audit purposes.
              </p>

              <p className="dispensary-text">
                Beyond standard dispensing, the facility also supports preventive healthcare initiatives, health awareness programs, and emergency medical services. With a focus on both individual patient care and overall community health, the dispensary acts as a cornerstone of the academy’s well-being efforts.
              </p>

              <p className="dispensary-text">
                The staff is trained to provide guidance on medication usage, treatment protocols, and health management. Through this holistic approach, the DPA Dispensary ensures that every member of the academy receives reliable medical support whenever needed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SERVICES CARDS ===== */}
      <section className="services-section">
        <div className="wide-container" style={{ width: '95%', margin: '0 auto' }}>
          <div className="row g-4">

            {/* Dental */}
            <div className="col-md-3 col-sm-6">
              <div className="service-card">
                <div className="service-icon"><FaTooth /></div>
                <h4 className="service-title">Dental Care</h4>
                <p className="service-text">Comprehensive dental services including checkups, cleanings, and oral health education.</p>
              </div>
            </div>

            {/* Eye */}
            <div className="col-md-3 col-sm-6">
              <div className="service-card">
                <div className="service-icon"><FaEye /></div>
                <h4 className="service-title">Eye Care</h4>
                <p className="service-text">Vision tests, eye treatments, and preventive eye health programs for all students and staff.</p>
              </div>
            </div>

            {/* Maternity */}
            <div className="col-md-3 col-sm-6">
              <div className="service-card">
                <div className="service-icon"><FaBaby /></div>
                <h4 className="service-title">Maternity</h4>
                <p className="service-text">Maternal health services including checkups, prenatal care, and counseling.</p>
              </div>
            </div>

            {/* General Health */}
            <div className="col-md-3 col-sm-6">
              <div className="service-card">
                <div className="service-icon"><FaHeartbeat /></div>
                <h4 className="service-title">General Health</h4>
                <p className="service-text">Primary healthcare services including consultations, treatments, and wellness programs.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
