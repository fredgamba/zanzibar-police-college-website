// src/pages/Contact.jsx
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import api from "../utils/api";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    api
      .get("contact/")
      .then((response) => {
        setContactInfo(response.data.length > 0 ? response.data[0] : null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact info:", error);
        setLoading(false);
      });
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("contact/send-email/", formData); // Backend endpoint for sending emails
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setFormStatus("Failed to send message. Please try again later.");
    }
  };

  if (loading) {
    return <div className="loading">Loading contact information...</div>;
  }

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Dar es Salaam Police Academy</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* CONTACT INFO + OFFICE HOURS */}
            <div className="contact-info-card">
  <h2>Get in Touch</h2>

  {/* Address */}
  <div className="contact-item">
    <MapPin />
    <div>
      <h4>Address</h4>
      <p>
        {contactInfo?.address ||
          "Dar es Salaam Police Academy, Kurasini, Dar es Salaam, Tanzania"}
      </p>
      <p><strong>P.O. Box:</strong> 2503, Dar es Salaam</p>
    </div>
  </div>

  {/* Phone */}
  <div className="contact-item">
    <Phone />
    <div>
      <h4>Phone</h4>
      <p>{contactInfo?.phone || "+255 22 285 0067"}</p>
    </div>
  </div>

  {/* Email */}
  <div className="contact-item">
    <Mail />
    <div>
      <h4>Email</h4>
      <p>{contactInfo?.email || "info@domain.com"}</p>
    </div>
  </div>

  {/* Office Hours */}
  <div className="contact-item">
    <Clock />
    <div>
      <h4>Office Hours</h4>
      <p>Monday – Friday: 08:00 – 16:00</p>
    </div>
  </div>
</div>

            {/* CONTACT FORM */}
            <div className="contact-form-card">
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInput}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInput}
                  required
                ></textarea>
                <button type="submit">Send Message</button>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </form>
            </div>

          </div>

          {/* MAP */}
          <div className="map-card">
            <iframe
              title="Dar es Salaam Police Academy Location"
              src="https://www.google.com/maps?q=Dar%20es%20Salaam%20Police%20Academy&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
