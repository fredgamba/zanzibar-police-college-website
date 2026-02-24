import React from 'react';
import './FeeStructure.css';

const FeeStructure = () => {
  const courses = [
    {
      name: 'Driving Course',
      levels: [
        { level: 'A', reg: '10,000/=', tuition: '50,000/=', other: '105,000/=', accom: 'Off campus', cert: 'Included in the tuition fee', total: '165,000/=' },
        { level: 'B1', reg: '10,000/=', tuition: '290,000/=', other: '109,000/=', accom: 'Off campus', cert: 'Included in the tuition fee', total: '409,000/=' },
        { level: 'C', reg: '10,000/=', tuition: '210,000/=', other: '113,000/=', accom: 'Off campus', cert: 'Included in the tuition fee', total: '333,000/=' },
        { level: 'D', reg: '10,000/=', tuition: '210,000/=', other: '113,000/=', accom: 'Off campus', cert: 'Included in the tuition fee', total: '333,000/=' },
      ]
    },
    {
      name: 'Technician Certificate in Police Science',
      levels: [
        { level: 'NTA Level 5', reg: '5,000/=', tuition: '-', other: 'Government sponsored', accom: '-', cert: '10,000/= (For transcript)', total: '15,000/=' },
      ]
    },
    {
      name: "Non Commissioned Officer's Course (NCO's)",
      levels: [
        { level: 'Junior and Senior NCO’s', reg: '-', tuition: '-', other: 'Government sponsored', accom: '-', cert: '-', total: '-' },
      ]
    },
  ];

  return (
    <div className="fee-structure-container">
      <div className="fee-structure-wrapper">
        <div className="header-section">
          <h1 className="main-title">Fees Structure</h1>
          <p className="subtitle">Zanzibar Police College</p>
        </div>

        <div className="table-container">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Name of the Course</th>
                <th>Level / Class</th>
                <th>Registration Fee</th>
                <th>Tuition Fee</th>
                <th>Other Fees</th>
                <th>Accommodation</th>
                <th>Certification Fee</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <React.Fragment key={idx}>
                  {course.levels.map((level, lIdx) => (
                    <tr key={`${idx}-${lIdx}`}>
                      <td className="item-cell">{lIdx === 0 ? course.name : ''}</td>
                      <td className="level-cell">{level.level}</td>
                      <td className="amount-cell">{level.reg}</td>
                      <td className="amount-cell">{level.tuition}</td>
                      <td className="amount-cell">{level.other}</td>
                      <td className="amount-cell">{level.accom}</td>
                      <td className="cert-cell">{level.cert}</td>
                      <td className="amount-cell">{level.total}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-section">
          <div className="info-card">
            <p><strong>Important Note:</strong> All fees are in Tanzanian Shillings (TZS). Government-sponsored programs may have full or partial coverage. Please verify with the Zanzibar Police College administration for the most current information.</p>
          </div>

          <div className="accommodation-card">
            <h2 className="section-title">Accommodation Details</h2>
            <p>
              Accommodation for most courses is off-campus. Government-sponsored students may qualify for on-campus hostel facilities. Meals and other living expenses are typically the responsibility of the student.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;