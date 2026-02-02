
import "./ApplicationProcess.css";
import commandant from "../../assets/commandant.png";

const ApplicationProcess = () => {
  return (
    <div className="application-page">
      <div className="application-container">
        {/* LEFT CONTENT */}
        <div className="application-content">
          <h1>Admission Procedure</h1>

          <h3>Get in Touch</h3>
          <p>
            All enquiries about admission to Dar es Salaam Police Academy should
            be addressed to the Commandant office.
          </p>

          <div className="address-card">
            <h4>Address</h4>
            <p><strong>The Commandant – DPA</strong></p>
            <p>P.O. Box 2503, Dar es Salaam</p>
            <p>Tel: +255 022 285 0067</p>
            <p>Fax: +255 022 285 0514</p>
            <p>
              E-mail:{" "}
              <a href="mailto:co.dpa@pf.go.tz">co.dpa@pf.go.tz</a>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="application-image">
          <img src={commandant} alt="Commandant DPA" />
          <p className="image-caption">
            Commandant – Dar es Salaam Police Academy
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;

