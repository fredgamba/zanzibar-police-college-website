import './FeeStructure.css';

export default function FeeStructure() {
  return (
    <div className="fee-structure-page">
      <div className="fee-structure-container">
        <h1 className="fee-structure-title">
          Tuition Fees Structures For The Dare Es Salaam Police Academy
        </h1>
        
        <div className="table-wrapper">
          <table className="fee-table">
            <thead>
              <tr>
                <th rowSpan="2" className="item-description-header">Item Description</th>
                <th colSpan="4" className="amount-header">
                  Amount in <u>Tshs</u>
                </th>
              </tr>
              <tr>
                <th>NTA Level IV</th>
                <th>NTA Level V</th>
                <th>NTA Level VI</th>
                <th>CERTIFICATE IN LAW</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition fee per year (non-refundable)</td>
                <td>1,130,000/=</td>
                <td>1,130,000/=</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Registration/Admission Fee</td>
                <td>30,000/=</td>
                <td>0</td>
                <td>0</td>
                <td>20,000/=</td>
              </tr>
              <tr>
                <td>Quality assurance fees</td>
                <td>15,000/=</td>
                <td>0</td>
                <td>15,000</td>
                <td></td>
              </tr>
              <tr>
                <td>Student Identity Card</td>
                <td>10,000/=</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Non-refundable caution money</td>
                <td>50,000/=</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>K/L Health Training</td>
                <td>45,000/=</td>
                <td>0</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Sustainability Fund</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Medical Capitation</td>
                <td>50,500/=</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Examination Fee</td>
                <td>150,000/=</td>
                <td></td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Field Practical</td>
                <td>0</td>
                <td>300,000/=</td>
                <td>15,000/=</td>
                <td></td>
              </tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>1,480,500</strong></td>
                <td><strong>1,430,000/=</strong></td>
                <td><strong>15,000</strong></td>
                <td><strong>20,000</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="fee-notes-section">
          <p className="fee-note">
            <strong>NB:</strong> 0=Means not paid or it is paid by the Government
          </p>

          <div className="accommodation-section">
            <h2 className="accommodation-title">ACCOMMODATION AND MEALS</h2>
            <p className="accommodation-text">
              Hostel is paid by the Government for the students who live in hostel during their studies, but meals are paid by the students at low cost of 7,000/= per day, only for days which students are in hostels.
            </p>
            <p className="accommodation-text">
              Students who are living out of campus pays meal for themselves
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
