<<<<<<< HEAD
// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('contact/')
      .then(response => {
        setContactInfo(response.data.length > 0 ? response.data[0] : null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading contact info...</div>;
  }

  return (
    <div>
      <h1>Contact Us</h1>
      {contactInfo ? (
        <>
          <p><strong>Address:</strong> {contactInfo.address}</p>
          <p><strong>Phone:</strong> {contactInfo.phone}</p>
          <p><strong>Email:</strong> {contactInfo.email}</p>
        </>
      ) : (
        <p>No contact information available.</p>
      )}
    </div>
  );
=======
// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('contact/')
      .then(response => {
        setContactInfo(response.data.length > 0 ? response.data[0] : null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading contact info...</div>;
  }

  return (
    <div>
      <h1>Contact Us</h1>
      {contactInfo ? (
        <>
          <p><strong>Address:</strong> {contactInfo.address}</p>
          <p><strong>Phone:</strong> {contactInfo.phone}</p>
          <p><strong>Email:</strong> {contactInfo.email}</p>
        </>
      ) : (
        <p>No contact information available.</p>
      )}
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}