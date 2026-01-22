// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="tptc-footer">
      <div className="tptc-footer-container">
        <div className="tptc-footer-main">
          {/* About Section */}
          <div className="tptc-footer-section tptc-about-section">
            <div className="tptc-footer-logo">
              <img
                src="/images/logoPolice.png"
                alt="Dar es Salaam Police Academy Logo"
                className="tptc-footer-logo-img"
              />
              <h2 className="tptc-footer-title">Dar es Salaam Police Academy</h2>
            </div>
            <p className="tptc-footer-description">
              Dedicated to excellence in law enforcement education and training, 
              developing professional police officers to serve and protect the 
              United Republic of Tanzania.
            </p>
            <div className="tptc-social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="tptc-social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="tptc-social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="tptc-social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="tptc-social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tptc-social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="tptc-footer-section">
            <h3 className="tptc-footer-heading">Contact Information</h3>
            <ul className="tptc-contact-list">
              <li><i className="fas fa-map-marker-alt"></i> Dar es Salaam Police Academy,</li>
              <li className="tptc-contact-indent">P.O. Box 2503,</li>
              <li className="tptc-contact-indent">Kurasini,</li>
              <li className="tptc-contact-indent">Dar es Salaam, Tanzania.</li>
              <li><i className="fas fa-phone-alt"></i>  (+255) 0222850067</li>
              <li><i className="fas fa-envelope"></i> Email: <a href="Email: info@domain.com" className="tptc-email-link">info@dpacademy.go.tz</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="tptc-footer-section">
            <h3 className="tptc-footer-heading">Quick Links</h3>
            <ul className="tptc-links-list">
              <li><Link to="/about" className="tptc-nav-footer-link"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><Link to="/admission" className="tptc-nav-footer-link"><i className="fas fa-chevron-right"></i> Admission</Link></li>
              <li><Link to="/facilities" className="tptc-nav-footer-link"><i className="fas fa-chevron-right"></i> Facilities</Link></li>
              <li><Link to="/news" className="tptc-nav-footer-link"><i className="fas fa-chevron-right"></i> News</Link></li>
              <li><Link to="/contact" className="tptc-nav-footer-link"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>

          {/* Police Colleges */}
          <div className="tptc-footer-section tptc-right-section">
            <h3 className="tptc-footer-heading">Police Colleges</h3>
            <ul className="tptc-links-list">
              <li>
                <a href="https://polisi.go.tz" className="tptc-external-link" target="_blank" rel="noopener">
                  <i className="fas fa-chevron-right"></i> Tanzania Police Force
                </a>
              </li>
              <li>
                <a href="https://tpsmoshi.ac.tz" className="tptc-external-link" target="_blank" rel="noopener">
                  <i className="fas fa-chevron-right"></i> Tanzania Police School
                </a>
              </li>
              <li>
                <a href="https://www.nacte.go.tz" className="tptc-external-link" target="_blank" rel="noopener">
                  <i className="fas fa-chevron-right"></i> Marine Police College
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tptc-footer-bottom">
          <p className="tptc-copyright">
            &copy; {new Date().getFullYear()} Dar es Salaam Police Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}