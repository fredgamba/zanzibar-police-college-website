<<<<<<< HEAD
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function ApplicationProcess() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/application_process/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Application Process:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Application Process...</div>;
  if (!content) return <div>Not available.</div>;

  return (
    <div className="application-process-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
=======
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
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
