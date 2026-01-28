import React from 'react';
import './FeeStructure.css';

const FeeStructure = () => {
  const feeData = [
    {
      item: 'Tuition fee per year (non-refundable)',
      tshs: '',
      ntaIV: '1,130,000/=',
      ntaV: '1,130,000/=',
      ntaVI: '0',
      certLaw: '0'
    },
    {
      item: 'Registration/Admission Fee',
      tshs: '',
      ntaIV: '30,000/=',
      ntaV: '0',
      ntaVI: '0',
      certLaw: '20,000/='
    },
    {
      item: 'Quality assurance fees',
      tshs: '',
      ntaIV: '15,000/=',
      ntaV: '0',
      ntaVI: '15,000',
      certLaw: '-'
    },
    {
      item: 'Student Identity Card',
      tshs: '',
      ntaIV: '10,000/=',
      ntaV: '0',
      ntaVI: '0',
      certLaw: '0'
    },
    {
      item: 'Non-refundable caution money',
      tshs: '',
      ntaIV: '50,000/=',
      ntaV: '0',
      ntaVI: '0',
      certLaw: '0'
    },
    {
      item: 'K/L Health Training',
      tshs: '',
      ntaIV: '45,000/=',
      ntaV: '-',
      ntaVI: '-',
      certLaw: '-'
    },
    {
      item: 'Sustainability Fund',
      tshs: '',
      ntaIV: '-',
      ntaV: '-',
      ntaVI: '-',
      certLaw: '-'
    },
    {
      item: 'Medical Capitation',
      tshs: '',
      ntaIV: '50,500/=',
      ntaV: '-',
      ntaVI: '-',
      certLaw: '-'
    },
    {
      item: 'Examination Fee',
      tshs: '',
      ntaIV: '150,000/=',
      ntaV: '-',
      ntaVI: '0',
      certLaw: '0'
    },
    {
      item: 'Field Practical',
      tshs: '',
      ntaIV: '0',
      ntaV: '300,000/=',
      ntaVI: '15,000/=',
      certLaw: '-'
    }
  ];

  const totalRow = {
    item: 'Total',
    tshs: '',
    ntaIV: '1,480,500',
    ntaV: '1,430,000/=',
    ntaVI: '15,000',
    certLaw: '20,000'
  };

  return (
    <div className="fee-structure-container">
      <div className="fee-structure-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-decoration"></div>
          <h1 className="main-title">Tuition Fees Structure</h1>
          <p className="subtitle">Dar Es Salaam Police Academy</p>
          <div className="header-decoration"></div>
        </div>

        {/* Fee Table */}
        <div className="table-container">
          <div className="table-wrapper">
            <table className="fee-table">
              <thead>
                <tr>
                  <th className="item-header">Item Description</th>
                  <th className="amount-header">Amount in Tshs</th>
                  <th className="level-header">NTA Level IV</th>
                  <th className="level-header">NTA Level V</th>
                  <th className="level-header">NTA Level VI</th>
                  <th className="cert-header">CERTIFICATE IN LAW</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, index) => (
                  <tr key={index} className="data-row">
                    <td className="item-cell">{row.item}</td>
                    <td className="amount-cell">{row.tshs}</td>
                    <td className="level-cell">{row.ntaIV}</td>
                    <td className="level-cell">{row.ntaV}</td>
                    <td className="level-cell">{row.ntaVI}</td>
                    <td className="cert-cell">{row.certLaw}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td className="total-label">{totalRow.item}</td>
                  <td className="total-amount">{totalRow.tshs}</td>
                  <td className="total-value">{totalRow.ntaIV}</td>
                  <td className="total-value">{totalRow.ntaV}</td>
                  <td className="total-value">{totalRow.ntaVI}</td>
                  <td className="total-value">{totalRow.certLaw}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <p className="info-note">
                <strong>NB:</strong> 0 = Means not paid or it is paid by the Government
              </p>
            </div>
          </div>

          <div className="accommodation-card">
            <h2 className="section-title">
              <span className="title-icon">🏠</span>
              ACCOMMODATION AND MEALS
            </h2>
            <p className="accommodation-text">
              Hostel is paid by the Government for the students who live in hostel during their studies, 
              but meals are paid by the students at low cost of <strong>7,000/=</strong> per day, only for 
              days which students are in hostels.
            </p>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="footer-decoration"></div>
      </div>
    </div>
  );
};

export default FeeStructure;