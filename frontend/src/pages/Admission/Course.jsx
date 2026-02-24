import './Course.css';
import modernDormitoriesImage from '../../assets/modern-dormitories.png';
import { useParams } from "react-router-dom";

export default function Course() {
  const { slug } = useParams();

  return (
    <div className="course-page">
      <div className="course-container">
        <h1 className="course-title">
          Courses Offered at ZPC
          {slug === "academic" && " - Academic Programme"}
          {slug === "promotional" && " - Promotional Programmes"}
          {slug === "proficiency" && " - Proficiency Programmes"}
        </h1>
        
        <div className="course-content-wrapper">
          {/* Left Column - Image (sticky) */}
          <div className="course-image-column">
            <div className="course-image-wrapper">
              <img 
                src={modernDormitoriesImage} 
                alt="ZPC Modern Dormitories" 
                className="course-image"
              />
            </div>
            <p className="course-image-caption">"Our Modern Dormitories."</p>
          </div>

          {/* Right Column - All Text Content */}
          <div className="course-text-column">
            {/* Promotion course - Juu, full width */}
            <div className="course-section-card promotion">
              <div className="card-top-bar"></div>
              <div className="course-section-content">
                <h2 className="course-section-title">
                  Promotion course for Non Commissioned Officer in the Police force
                </h2>
                <ul className="course-list">
                  <li>CPLC</li>
                  <li>SGTC</li>
                  <li>INSC</li>
                </ul>
                {/* Unaweza kuongeza maelezo zaidi hapa ikiwa unayo */}
              </div>
            </div>

            {/* Wrapper kwa Professional na Private - side by side */}
            <div className="course-programs-wrapper">
              {/* Professional Programmes - Kushoto */}
              <div className="course-section-card">
                <div className="card-top-bar"></div>
                <div className="course-section-content">
                  <h2 className="course-section-title">Professional Programmes</h2>
                  <ul className="course-list">
                    <li>Traffic Courses</li>
                    <li>Charge room course</li>
                  </ul>
                </div>
              </div>

              {/* Private Programmes - Kulia (sasa iko upande wa kulia kama ulivyotaka) */}
              <div className="course-section-card">
                <div className="card-top-bar"></div>
                <div className="course-section-content">
                  <h2 className="course-section-title">Private Programmes</h2>
                  <ul className="course-list">
                    <li>Auxiliary Police Courses</li>
                    <li>Class “A”, “B1”, “C” and “D” driving courses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Academic Programmes - Unaweza kuiweka hapa au kuifuta ikiwa si ya msingi */}
            <div className="course-section-card">
              <div className="card-top-bar"></div>
              <div className="course-section-content">
                <h2 className="course-section-title">Academic Programmes</h2>
                <ul className="course-list">
                  <li>Technician Certificate in Police Science (NTA Level 5)</li>
                </ul>
              </div>
            </div>

            {/* NOTE - Chini, full width */}
            <div className="course-note-card">
              <h3 className="course-note-title">NOTE:</h3>
              <p className="course-note-text">
                The Academy has also been appointed as a Centre for Excellence for Public order Management Programmes.
              </p>
              <p className="course-note-text">
                Candidates for long and short courses must have the required education and work experience to enable them complete and benefit from the courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}