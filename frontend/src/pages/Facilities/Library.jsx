// src/pages/Admission/library.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Library() {
  return (
    <div className="library-page">
      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        .library-section {
          background: #ffffff;
          padding: 80px 0;
        }

        .library-wrapper {
          height: 560px;
        }

        .library-title {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #0b2c3d;
          text-align: center; /* Center the title */
        }

        .library-text {
          color: #6c757d;
          line-height: 1.9;
          font-size: 17px;
          margin-bottom: 24px;
          max-width: 100%;
          text-align: justify; /* Make text stretched across width */
        }

        .library-images {
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
          line-height: 1.6;
        }

        /* Align right column text to top */
        .library-wrapper .col-lg-5 {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        @media (max-width: 991px) {
          .library-wrapper {
            height: auto;
          }

          .library-images {
            height: 360px;
            margin-bottom: 30px;
          }
        }

        @media (max-width: 768px) {
          .library-title {
            font-size: 30px;
          }

          .library-text {
            font-size: 15px;
          }
        }
      `}</style>

      {/* ===== CONTENT ===== */}
      <section className="library-section">
        <div className="container-fluid wide-container">
          <div className="row g-3 library-wrapper">

            {/* LEFT SIDE – CAROUSEL */}
            <div className="col-lg-6 h-100">
              <div className="library-images">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                >
                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/library1.jpg" alt="Library reading area" />
                      <div className="image-caption">
                        Quiet and comfortable reading spaces designed for focused study and research.
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="image-main">
                      <img src="/images/library2.jpg" alt="Library computer section" />
                      <div className="image-caption">
                        Modern computer facilities providing access to digital resources and the internet.
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* RIGHT SIDE – TEXT */}
            <div className="col-lg-5">
              <h1 className="library-title">LIBRARY</h1>

              <p className="library-text">
                The ZPC Library is a comprehensive knowledge hub. Every section is carefully curated to provide students, researchers, and faculty members with easy access to materials for study, projects, and academic research.
              </p>

              <p className="library-text">
                Our modern library is designed to support both individual study and collaborative learning. Quiet reading zones, discussion areas, and group study rooms are strategically placed to maximize productivity. Comfortable seating and ambient lighting make long study sessions more enjoyable.
              </p>

              <p className="library-text">
                In addition to print materials, the library offers extensive digital resources. Students can access e-books, online journals, databases, and high-speed internet workstations. Our staff also provides guidance on research methodologies, citations, and academic support to ensure that every user achieves success in their studies.
              </p>

              <p className="library-text">
                The library frequently hosts workshops, reading sessions, and educational events. It is more than just a place to borrow books—it is a dynamic learning environment where knowledge, collaboration, and innovation thrive.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
