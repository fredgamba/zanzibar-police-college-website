import './ApplicationProcess.css';
import commandantImage from '../../assets/commandant.png';

export default function ApplicationProcess() {
  return (
    <div className="application-process-page">
      <div className="application-container">
        <h1 className="application-title">Admission Procedure</h1>
        
        <div className="application-content">
          {/* Left Column - Text Content */}
          <div className="application-text-column">
            <section className="application-section">
              <h2 className="section-heading">Get intouch</h2>
              <p className="section-text">
                All enquiries about admission to Dar es salaam Police Academy should be addressed to the Commandant office
              </p>
            </section>

            <section className="application-section">
              <h2 className="section-heading">ADDRESS</h2>
              <div className="contact-details">
                <p className="contact-line"><strong>The Commandant – DPA</strong></p>
                <p className="contact-line">P.O. Box 2503, Dar es Salaam</p>
                <p className="contact-line">Tel: +255 022 285 0067</p>
                <p className="contact-line">Fax: +255 022 285 0514</p>
                <p className="contact-line">E-mail: <a href="mailto:co.dpa@tpf.go.tz">co.dpa@tpf.go.tz</a></p>
              </div>
            </section>
          </div>

          {/* Right Column - Image */}
          <div className="application-image-column">
            <div className="commandant-image-wrapper">
              <img 
                src={commandantImage} 
                alt="The Commandant - DPA" 
                className="commandant-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
