// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { 
  Send, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  Newspaper, 
  Image, 
  Users,
  Award,
  MapPin,
  Clock,
  ChevronRight,
  GraduationCap,
  Shield,
  Target,
  BarChart3,
  Library,
  HomeIcon,
  Activity,
  Dumbbell,
  Bell,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from '../utils/api';

export default function Home() {
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState({ news: [], announcements: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, postsRes] = await Promise.all([
          api.get('pages/home/'),
          api.get('posts/'),
        ]);
        setContent(contentRes.data);
        const data = postsRes.data;
        setPosts({
          news: data.filter(p => p.post_type === 'news').slice(0, 4),
          announcements: data.filter(p => p.post_type === 'announcement').slice(0, 3),
          events: data.filter(p => p.post_type === 'event').slice(0, 3),
        });
      } catch (err) {
        console.error('Error loading home content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sample data for sections
  const programs = [
    {
      title: "Certificate in Law Enforcement",
      duration: "1 Year",
      icon: <Shield className="program-icon-svg" />,
      color: "#1c236d"
    },
    {
      title: "Diploma in Criminal Investigation", 
      duration: "2 Years",
      icon: <Target className="program-icon-svg" />,
      color: "#2d4cc8"
    },
    {
      title: "Leadership and Management Course",
      duration: "6 Months", 
      icon: <Users className="program-icon-svg" />,
      color: "#1c236d"
    },
    {
      title: "Advanced Police Training",
      duration: "1 Year",
      icon: <Award className="program-icon-svg" />,
      color: "#2d4cc8"
    },
    {
      title: "Forensic Science Program",
      duration: "2 Years",
      icon: <Activity className="program-icon-svg" />,
      color: "#1c236d"
    },
    {
      title: "Community Policing Certificate",
      duration: "1 Year",
      icon: <GraduationCap className="program-icon-svg" />,
      color: "#2d4cc8"
    }
  ];

  const facilities = [
    { 
      icon: <Library className="facility-icon-svg" />, 
      name: "Modern Library", 
      description: "Extensive collection of law enforcement literature and digital resources",
      features: ["24/7 Access", "Digital Resources", "Study Rooms"]
    },
    { 
      icon: <BookOpen className="facility-icon-svg" />, 
      name: "Computer Lab", 
      description: "State-of-the-art technology for digital forensics and research",
      features: ["High-Speed Internet", "Forensic Software", "Modern Equipment"]
    },
    { 
      icon: <HomeIcon className="facility-icon-svg" />,
      name: "Student Hostels", 
      description: "Comfortable and secure accommodation for all cadets",
      features: ["WiFi", "Security", "Recreation"]
    },
    { 
      icon: <Activity className="facility-icon-svg" />, 
      name: "Parade Ground", 
      description: "Spacious grounds for military drills and ceremonies",
      features: ["5 Acres", "Lighting", "Grandstand"]
    },
    { 
      icon: <Target className="facility-icon-svg" />, 
      name: "Shooting Range", 
      description: "Modern firearms training facility with safety protocols",
      features: ["Indoor/Outdoor", "Safety Gear", "Expert Trainers"]
    },
    { 
      icon: <Dumbbell className="facility-icon-svg" />, 
      name: "Gymnasium", 
      description: "Fully equipped fitness center for physical training",
      features: ["Modern Equipment", "Trainers", "24/7 Access"]
    }
  ];

  const stats = [
    { number: "5000+", label: "Graduated Officers", icon: <GraduationCap className="stat-icon" /> },
    { number: "50+", label: "Qualified Instructors", icon: <Users className="stat-icon" /> },
    { number: "15+", label: "Training Programs", icon: <BookOpen className="stat-icon" /> },
    { number: "98%", label: "Employment Rate", icon: <BarChart3 className="stat-icon" /> }
  ];

  const galleryImages = Array(6).fill().map((_, i) => ({
    src: `/images/gallery${i + 1}.jpg`,
    alt: `Campus activity ${i + 1}`
  }));

  const slides = [
    {
      image: '/images/slide1.jpg',
      title: "Welcome to the Center of Excellence",
      subtitle: "Where Discipline Meets Leadership"
    },
    {
      image: '/images/slide2.jpg', 
      title: "Shape the Future of Law Enforcement",
      subtitle: "Join Tanzania Police Academy"
    },
    {
      image: '/images/slide3.jpg',
      title: "Excellence in Training, Integrity in Service", 
      subtitle: "Building Professional Officers"
    }
  ];

  const settings = {
    dots: false, // Removed dots
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Academy Information...</p>
    </div>
  );

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <div className="hero-carousel">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="apply-overlay">
          <a
            href="https://tvetims.nacte.go.tz/"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-hero-btn animated-padding"
          >
            <Send className="btn-icon" /> Apply Online
          </a>
        </div>
      </div>

      {/* Commandant Message Section */}
      <section className="commandant-section">
        <div className="container">
          <div className="commandant-content">
            <div className="commandant-image">
              <img src="/images/mambosasa.jpg" alt="Dr. Lazaro B. Mambosasa-DCP - Commandant" />
              <div className="commandant-badge">
                <Award className="badge-icon" />
              </div>
            </div>
            <div className="commandant-message">
              <div className="message-header">
                <span className="message-icon"></span>
                <h2>Message from the Commandant</h2>
              </div>
              <blockquote>
                "At Dar es Salaam Police Academy, we shape officers of integrity and excellence. 
                Our commitment extends beyond academic excellence to character building, ensuring 
                our graduates serve with honor, courage, and unwavering dedication to justice."
              </blockquote>
              <div className="commandant-info">
                <h3>Dr. Lazaro B. Mambosasa-DCP</h3>
                <p>Deputy Commissioner of Police - Commandant</p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="container">
          <div className="section-header">
            <div className="animated-icon">🎓</div>
            <h2>Programs & Courses</h2>
            <p className="section-subtitle">Comprehensive Training for Law Enforcement Professionals</p>
          </div>
          <div className="programs-grid">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className={`program-card animated-card ${hoveredCard === `program-${index}` ? 'card-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(`program-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--accent-color': program.color }}
              >
                <div className="program-icon-wrapper">
                  <div className="program-icon-bg"></div>
                  {program.icon}
                </div>
                <h3>{program.title}</h3>
                <div className="program-duration">
                  <Clock className="duration-icon" />
                  {program.duration}
                </div>
                <p>Comprehensive training program designed to develop skilled law enforcement professionals.</p>
                <div className="program-features">
                  <span>Practical Training</span>
                  <span>Field Exercises</span>
                  <span>Expert Instructors</span>
                </div>
                <a href="/programs" className="modern-btn outline animated-padding">
                  View Details <ChevronRight className={`btn-icon ${hoveredCard === `program-${index}` ? 'icon-slide' : ''}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <div className="section-header">
            <div className="animated-icon">🏢</div>
            <h2>Our Facilities</h2>
            <p className="section-subtitle">World-Class Infrastructure for Optimal Learning</p>
          </div>
          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div 
                key={index} 
                className={`facility-card animated-card ${hoveredCard === `facility-${index}` ? 'card-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(`facility-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="facility-icon-wrapper">
                  <div className="facility-icon-bg"></div>
                  {facility.icon}
                </div>
                <h3>{facility.name}</h3>
                <p>{facility.description}</p>
                <div className="facility-features">
                  {facility.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="facility-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="news-events-section">
        <div className="container">
          <div className="news-events-grid">
            {/* News Section */}
            <div className="news-section">
              <div className="section-header-inline">
                <Newspaper className="section-icon" />
                <h2>News & Announcements</h2>
              </div>
              <div className="news-list">
                {posts.news.length > 0 ? (
                  posts.news.map((news, index) => (
                    <div 
                      key={news.id} 
                      className={`news-item ${hoveredCard === `news-${index}` ? 'card-hovered' : ''}`}
                      onMouseEnter={() => setHoveredCard(`news-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="news-content">
                        <div className="news-date">
                          {new Date(news.created_at).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <h3>{news.title}</h3>
                        <p>{news.excerpt || "Important update from the academy administration."}</p>
                      </div>
                      <div className="news-arrow">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="news-item">
                      <div className="news-content">
                        <div className="news-date">Jan 15, 2025</div>
                        <h3>New Intake for 2025/2026 Announced</h3>
                        <p>Applications now open for the upcoming academic year.</p>
                      </div>
                      <div className="news-arrow">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="news-item">
                      <div className="news-content">
                        <div className="news-date">Dec 20, 2024</div>
                        <h3>Graduation Ceremony Highlights</h3>
                        <p>Celebrating the achievements of our latest graduates.</p>
                      </div>
                      <div className="news-arrow">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <a href="/news" className="view-all-link">
                View All News <ExternalLink size={16} />
              </a>
            </div>

            {/* Events Section */}
            <div className="events-section">
              <div className="section-header-inline">
                <Calendar className="section-icon" />
                <h2>Upcoming Events</h2>
              </div>
              <div className="events-list">
                {posts.events.length > 0 ? (
                  posts.events.map((event, index) => (
                    <div 
                      key={event.id} 
                      className={`event-item ${hoveredCard === `event-${index}` ? 'card-hovered' : ''}`}
                      onMouseEnter={() => setHoveredCard(`event-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="event-date-badge">
                        <Calendar size={16} />
                        <span>
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <div className="event-content">
                        <h3>{event.title}</h3>
                        <p>{event.description || "Join us for this important academy event."}</p>
                        <div className="event-meta">
                          <span>📍 Main Campus</span>
                          <span>🕒 09:00 AM</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="event-item">
                      <div className="event-date-badge">
                        <Calendar size={16} />
                        <span>Nov 25</span>
                      </div>
                      <div className="event-content">
                        <h3>Graduation Day Ceremony</h3>
                        <p>Annual graduation ceremony celebrating our cadets' achievements.</p>
                        <div className="event-meta">
                          <span>📍 Main Auditorium</span>
                          <span>🕒 10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className="event-item">
                      <div className="event-date-badge">
                        <Calendar size={16} />
                        <span>Dec 12</span>
                      </div>
                      <div className="event-content">
                        <h3>Leadership Workshop</h3>
                        <p>Special training session for senior officers and department heads.</p>
                        <div className="event-meta">
                          <span>📍 Conference Hall</span>
                          <span>🕒 08:30 AM</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <a href="/events" className="view-all-link">
                See All Events <ExternalLink size={16} />
              </a>
            </div>

            {/* Announcements */}
            <div className="announcements-section">
              <div className="section-header-inline">
                <Bell className="section-icon" />
                <h2>Announcements</h2>
                <div className="notification-badge">New</div>
              </div>
              <div className="announcements-list">
                {posts.announcements.length > 0 ? (
                  posts.announcements.map((ann, index) => (
                    <div key={ann.id} className="announcement-item">
                      <div className="announcement-badge">!</div>
                      <div className="announcement-content">
                        <h3>{ann.title}</h3>
                        <span className="announcement-time">2 hours ago</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="announcement-item">
                      <div className="announcement-badge">!</div>
                      <div className="announcement-content">
                        <h3>Library Opening Hours Extended</h3>
                        <span className="announcement-time">Today</span>
                      </div>
                    </div>
                    <div className="announcement-item">
                      <div className="announcement-badge">!</div>
                      <div className="announcement-content">
                        <h3>New Security Protocols</h3>
                        <span className="announcement-time">Yesterday</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <div className="animated-icon">📸</div>
            <h2>Campus Gallery</h2>
            <p className="section-subtitle">Life at Dar es Salaam Police Academy</p>
          </div>
          <div className="gallery-3d">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item-3d"
                style={{ '--rotation': `${index * 60}deg` }}
              >
                <div className="gallery-item-inner">
                  <img src={image.src} alt={image.alt} />
                  <div className="gallery-overlay-3d">
                    <PlayCircle size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/gallery" className="modern-btn primary">
              <Image className="btn-icon" /> Explore Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section - Moved to bottom */}
      <section className="stats-section-bottom">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-circle">
                  {stat.icon}
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            <div className="link-card">
              <MapPin className="link-icon" />
              <h3>Visit Campus</h3>
              <p>Schedule a tour of our facilities</p>
              <a href="/visit" className="link-btn">Plan Visit</a>
            </div>
            <div className="link-card">
              <BookOpen className="link-icon" />
              <h3>Admissions</h3>
              <p>Start your application process</p>
              <a href="/admissions" className="link-btn">Apply Now</a>
            </div>
            <div className="link-card">
              <Users className="link-icon" />
              <h3>Contact Us</h3>
              <p>Get in touch with our team</p>
              <a href="/contact" className="link-btn">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}