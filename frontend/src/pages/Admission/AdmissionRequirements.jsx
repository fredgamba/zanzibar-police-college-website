import './AdmissionRequirements.css';

export default function AdmissionRequirements() {
  return (
    <div className="admission-requirements-page">
      <div className="admission-container">
        <h1 className="admission-title">Admission Requirements</h1>
        
        {/* Terms and Regulations Section */}
        <section className="admission-section">
          <h2 className="section-title">Admission Terms, Registration Procedures and Regulations</h2>
          <p className="section-text">
            A candidate is admitted to Dar es Salaam Police Academy on understanding that in accepting the admission he/she commits himself/herself to adhere to its statutes, Act, regulations, rules and by – laws. Dar es Salaam Police Academy is an institution of higher reputation which expects student's behavior on and off campus to be moral, ethical and legal. The Academy reserves the right to withdraw admission for conduct that is contrary to the objectives of the Academy.
          </p>
        </section>

        {/* Diploma Program */}
        <section className="admission-section">
          <h2 className="section-title">Diploma Program</h2>
          <p className="section-text">
            The Academy normally invites applications for admission to the various courses between early December and mid – May of the year for courses beginning in the following academic year. Applicants are required to apply online to NACTE, the qualified applicant will be selected by NACTE to join the offered program.
          </p>
        </section>

        {/* Certificate in Law */}
        <section className="admission-section">
          <h2 className="section-title">Certificate in Law</h2>
          <p className="section-text">
            The Academy normally invites applications for admission to the various courses between early December and mid – May of the year for courses beginning in the following academic year. Applicants are required to apply online to UDSM, the qualified applicant will be selected by UDSM to join the certificate in Law.
          </p>
        </section>

        {/* Certificate in Laboratory Technician */}
        <section className="admission-section">
          <h2 className="section-title">Certificate in Laboratory Technician</h2>
          <p className="section-text">
            The Academy normally invites applications for admission to the various courses between early December and mid – May of the year for courses beginning in the following academic year. Applicants are required to apply online to NACTE, the qualified applicant will be selected by NACTE to join the certificate in Laboratory Technician.
          </p>
        </section>

        {/* Promotion Program */}
        <section className="admission-section">
          <h2 className="section-title">Promotion Program</h2>
          <p className="section-text">
            The Academy receives names of the selected candidates for Gazetted officer and Assistant Inspector program from PHQ after being qualified by the promotion board based on qualification laid down by PGO 53.
          </p>
        </section>

        {/* Other Programs */}
        <section className="admission-section">
          <h2 className="section-title">Other Programs</h2>
          <p className="section-text">
            The Academy receives names of the selected candidates depending on the need of the organization and stakeholders
          </p>
          <p className="section-text warning-text">
            Those students who will report one week after classes have commenced shall be liable to a disciplinary actions including termination. There shall be no registration after the third week of commencement of the semester.
          </p>
          <ul className="admission-list">
            <li>Fresh students must register themselves within two weeks from the first day of the orientation week and furnishing a medical examination form on the fitness of the candidate.</li>
            <li>Failure to register for the programme will lead to automatic cancellation of student's admission. Such a student will therefore be required to re-apply for studies.</li>
            <li>A student enrolled at the Academy shall not be allowed to postpone studies after the academic year has begun except under special circumstances and with permission from the Chief Instructor.</li>
            <li>Permission to postpone studies shall be considered after producing satisfactory evidence of the reasons for postponement. Special circumstances shall include ill health and serious social problems.</li>
            <li>No student shall be allowed to postpone studies during the two weeks preceding final examination but may be considered for postponement of examinations.</li>
            <li>No change of names by students is entertained during the course of study at the Academy. Names appearing on the original academic certificates shall be used.</li>
          </ul>
        </section>

        {/* HDPS and BPS Table */}
        <section className="admission-section">
          <h2 className="section-title">Admission for Higher Diploma in Police Science HDPS (NTA level 7) And Bachelor Degree in Police Science-BPS (NTA level 8)</h2>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Program Name (Award)</th>
                  <th>Admission Requirements</th>
                  <th>Program Duration (Yrs)</th>
                  <th>Admission Capacity</th>
                  <th>Tuition Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Higher diploma Police Science - HDPS (NTA Level. 7)</td>
                  <td>Holder of NTA Level 6 in; Police Science or Criminal investigation.</td>
                  <td>2.0</td>
                  <td>100</td>
                  <td>Local Fee: Tsh NIL</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Bachelor Degree in Police Science - BPS (NTA Level 8)</td>
                  <td>Holders of NTA Level 7 in Police science</td>
                  <td>1.0</td>
                  <td>100</td>
                  <td>Local Fee: Tsh NIL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Diploma in Law Table */}
        <section className="admission-section">
          <h2 className="section-title">Admission for Diploma in Law DL (NTA level 6)</h2>
          <div className="table-wrapper">
            <table className="admission-table diploma-law-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Program Name (Award)</th>
                  <th>Admission Requirements</th>
                  <th>Program Duration (Yrs)</th>
                  <th>Admission Capacity</th>
                  <th>Tuition Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="2">3.</td>
                  <td rowSpan="2">The Ordinary Diploma in Law NTA Level 6</td>
                  <td>Holders of Certificate of Secondary Education Examination (CSEE) with at least four (4) passes in non-religious subjects including English language or National vocation award (nva) level III with certificate of secondary Education Examination (CSEE).</td>
                  <td>3.0</td>
                  <td>100</td>
                  <td>Local Fee: Tsh 1,200,000/=</td>
                </tr>
                <tr>
                  <td>Holders of Basic Technician Certificate (NTA Level 4) in Law OR Advanced Certificate of Secondary Education Examination (ACSEE) with at least one Principal pass and one Subsidiary in Principal subjects.</td>
                  <td>2.0</td>
                  <td>100</td>
                  <td>Local Fee: Tsh 1,200,000/=</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Diploma in Police Science Requirements */}
        <section className="admission-section">
          <h2 className="section-title">Admission Requirements for Diploma in Police Science</h2>
          <p className="section-text">
            The program comprises of eleven (11) modules that are spread over two semesters in one academic year. A module has to be covered in one semester of fifteen (15) weeks. Therefore the whole program has a total of thirty (30) weeks of study for full time attendance mode.
          </p>
          <p className="section-text">
            To qualify for admission to Diploma in Police Science (NTA Level 6 programs), a candidate is required to obtain a Technician Certificate in Police Science (NTA Level 5) or equivalent qualification(s) in Police Science.
          </p>

          {/* Semester I - Police Science */}
          <h3 className="subsection-title">SEMESTER I</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Course Title</th>
                  <th>Notional Hours</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PST 06101</td>
                  <td>Laws</td>
                  <td>11</td>
                  <td>16</td>
                </tr>
                <tr>
                  <td>PST 06102</td>
                  <td>Management of Police Stations</td>
                  <td>19</td>
                  <td>31</td>
                </tr>
                <tr>
                  <td>PST 06103</td>
                  <td>Military Training Management</td>
                  <td>5</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>PST 06110</td>
                  <td>Management of Operation Orders</td>
                  <td>4</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>PST 06111</td>
                  <td>Crime Map Analysis</td>
                  <td>4</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>PST 06105</td>
                  <td>Communication Skills</td>
                  <td>4</td>
                  <td>7</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Semester II - Police Science */}
          <h3 className="subsection-title">SEMESTER II</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Course Title</th>
                  <th>Notional Hours</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PST 06204</td>
                  <td>Resource Management</td>
                  <td>9</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>PST 06206</td>
                  <td>Criminal Investigation</td>
                  <td>8</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>PST 06207</td>
                  <td>Discipline Management</td>
                  <td>3</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>PST 06208</td>
                  <td>Community Policing and Public Partnership</td>
                  <td>4</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>PST 06209</td>
                  <td>Vital Installations Management</td>
                  <td>7</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>PST 06212</td>
                  <td>Field Attachment</td>
                  <td>-</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Medical Laboratory Technology Requirements */}
        <section className="admission-section">
          <h2 className="section-title">Admission Requirements for Basic Certificate in Medical Laboratory Technology program</h2>
          <p className="section-text">
            The program has a total of 34 weeks of study, which are divided in two semesters. Each semester consists Fifteen (15) weeks set aside for theoretical/ practical training and two weeks for end of semester Examinations.
          </p>
          <p className="section-text">
            To qualify for admission to Basic Certificate in Medical Laboratory Technology program
          </p>
          <ul className="admission-list">
            <li>a) The candidate is required to have a minimum of Certificate of Secondary Education Examination (CSEE) OR equivalent qualifications with passes in Science subjects; Chemistry and Biology at least grade D or above.</li>
            <li>b) Pass in English language, Physics and Mathematics is an added advantage.</li>
          </ul>

          {/* Semester I Modules - Medical Lab */}
          <h3 className="subsection-title">SEMESTER I MODULES</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th rowSpan="2">Code</th>
                  <th rowSpan="2">Module Title</th>
                  <th colSpan="4">Scheme of Study (Hours per week)</th>
                  <th rowSpan="2">Credits / Semester</th>
                </tr>
                <tr>
                  <th>Theory</th>
                  <th>Tutorials</th>
                  <th>Practical</th>
                  <th>Assignment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MLT04101</td>
                  <td>Basic Laboratory Instrumentation</td>
                  <td>2</td>
                  <td>1</td>
                  <td>3</td>
                  <td>2</td>
                  <td>16</td>
                </tr>
                <tr>
                  <td>MLT04102</td>
                  <td>Elementary Structure and Functions of Human Body</td>
                  <td>2</td>
                  <td>-</td>
                  <td>1</td>
                  <td>1</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>MLT04103</td>
                  <td>Laboratory Safety and Waste Management</td>
                  <td>2</td>
                  <td>1</td>
                  <td>3</td>
                  <td>2</td>
                  <td>16</td>
                </tr>
                <tr>
                  <td>MLT04104</td>
                  <td>Customer Care and Communication Skills</td>
                  <td>1</td>
                  <td>-</td>
                  <td>1</td>
                  <td>1</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>MLT04105</td>
                  <td>Professional Ethics</td>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>1</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>MLT04106</td>
                  <td>Prevention and Control of Diseases Transmission</td>
                  <td>2</td>
                  <td>-</td>
                  <td>2</td>
                  <td>1</td>
                  <td>8</td>
                </tr>
                <tr className="total-row">
                  <td></td>
                  <td>SUB-TOTAL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>57</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Semester II Modules - Medical Lab */}
          <h3 className="subsection-title">SEMESTER II MODULES</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th rowSpan="2">Code</th>
                  <th rowSpan="2">Module Title</th>
                  <th colSpan="4">Scheme of Study (Hours per week)</th>
                  <th rowSpan="2">Credits / Semester</th>
                </tr>
                <tr>
                  <th>Class</th>
                  <th>Tutorials</th>
                  <th>Practical</th>
                  <th>Assignment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MLT04207</td>
                  <td>Basic Laboratory Investigation</td>
                  <td>1</td>
                  <td>-</td>
                  <td>2</td>
                  <td>1</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>MLT04208</td>
                  <td>Basic Laboratory Specimen Management</td>
                  <td>2</td>
                  <td>2</td>
                  <td>3</td>
                  <td>1</td>
                  <td>17</td>
                </tr>
                <tr>
                  <td>MLT04209</td>
                  <td>Basic Computer Skills and Information Management</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>MLT04210</td>
                  <td>Occurrence Management and Record Keeping</td>
                  <td>2</td>
                  <td>-</td>
                  <td>2</td>
                  <td>1</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>MLT04211</td>
                  <td>Preparation of Basic Laboratory Reagents and Solutions</td>
                  <td>2</td>
                  <td>-</td>
                  <td>4</td>
                  <td>2</td>
                  <td>19</td>
                </tr>
                <tr className="total-row">
                  <td></td>
                  <td>TOTAL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>63</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Certificate in Law Requirements */}
        <section className="admission-section">
          <h2 className="section-title">Admission Requirements for Certificate in Law</h2>
          <p className="section-text">
            Admission procedures are per the requirements prescribed by University of Dar es Salaam School of Law (Formerly Faculty of Law). A candidate must have a service of at least three years. The programme duration shall be two semesters full time.
          </p>

          {/* Semester I - Certificate in Law */}
          <h3 className="subsection-title">SEMESTER I</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Course Title</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CTL 100</td>
                  <td>Public Law</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>CTL 200</td>
                  <td>Criminal Law</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>CTL 210</td>
                  <td>Criminal Procedure</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>DS 101</td>
                  <td>Development Studies</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>CTL 106</td>
                  <td>Communication Skills</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Semester II - Certificate in Law */}
          <h3 className="subsection-title">SEMESTER II</h3>
          <div className="table-wrapper">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Course Title</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CTL 212</td>
                  <td>Human Rights Law</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>CTL 222</td>
                  <td>Criminology and Penology</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>CTL 209</td>
                  <td>Law of Evidence</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>CTL 100</td>
                  <td>Public Law</td>
                  <td>6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
