
import { useState } from 'react';

export default function ApplyOnline() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submission will be connected to backend soon!');
    console.log('Form data:', formData);
    // TODO: Connect to Django API later
  };

  return (
    <div className="apply-online-page">
      <h1>Apply Online</h1>
      <p>Fill out the form below to begin your application to the Dar es Salaam Police Academy.</p>

      <form onSubmit={handleSubmit} className="application-form">
        <div>
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>National ID / Passport Number *</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Residential Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );

}