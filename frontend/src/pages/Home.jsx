
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
 /*
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
*/

const programs = [
 
  {
    title: "Academic Courses",
    description:
      "Advanced educational programs offering undergraduate degrees and specialized certifications.",
    image: "/images/academic.jpg",
    color: "#065f46",
  },
  {
    title: "Promotional Courses",
    description:
      "Leadership and skill enhancement training designed to prepare officers for higher ranks.",
    image: "/images/promotional.jpg",
    color: "#5b21b6",
  },
  
  
  
  {
    title: "Proficiency Courses",
    description:
      "Specialized training programs focusing on technical skills and tactical operations.",
    image: "/images/proficiency.jpg",
    color: "#9a3412",
  },
];
const facilities = [
  {
    category: "ICT Labs",
    name: "Networking Lab",
    image: "/images/campus4.jpg",
    description: "Specialized lab for network administration and cybersecurity training.",
    progress: 85
  },
  {
    category: "ICT Labs",
    name: "Computer Lab",
    image: "/images/promotional.jpg",
    description: "State-of-the-art technology for digital forensics and research.",
     progress: 90
  },
  {
    category: "Sports Areas",
    name: "Basketball Courts",
    image: "/images/campus3.jpg",
    description: "Multiple indoor and outdoor basketball courts for training and competitions.",
    progress: 75
  },
  {
    category: "Library",
    name: "Modern Library",
    image: "/images/campus4.jpg",
    description: "Extensive collection of law enforcement literature and digital resources.",
    progress: 95
  }
];


  const stats = [
    { number: "5000+", label: "Graduated Officers", icon: <GraduationCap className="stat-icon" /> },
    { number: "50+", label: "Qualified Instructors", icon: <Users className="stat-icon" /> },
    { number: "15+", label: "Training Programs", icon: <BookOpen className="stat-icon" /> },
    { number: "98%", label: "Employment Rate", icon: <BarChart3 className="stat-icon" /> }
  ];

   const galleryImages = [
  { src: "/images/campus1.webp", alt: "Campus activity 1" },
   { src: "/images/campus2.jpg", alt: "Campus activity 2" },
  { src: "/images/campus3.jpg", alt: "Campus activity 3" },
  { src: "/images/campus4.jpg", alt: "Campus activity 4" },
   { src: "/images/campus5.jpeg", alt: "Campus activity 5" },
];
  const slides = [
    {
      image: '/images/campus2.jpg',
      title: "Welcome to the Center of Excellence",
      subtitle: "Where Discipline Meets Leadership"
    },
    {
      image: '/images/campus3.jpg', 
      title: "Shape the Future of Law Enforcement",
      subtitle: "Join Tanzania Police Academy"
    },
    {
      image: '/images/campus4.jpg',
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
    <div className="commandant-card">

      {/* IMAGE */}
      <div className="commandant-image">
        <img
          src="/images/mambosasa.jpg"
          alt="Dr. Lazaro B. Mambosasa-DCP - Commandant"
        />
        <div className="commandant-badge">
          <Award size={22} />
        </div>
      </div>

      {/* MESSAGE */}
      <div className="commandant-message">
        <span className="section-tag">Leadership Message</span>

        <h2>Message from the Commandant</h2>

        <blockquote>
          “At Dar es Salaam Police Academy, we shape officers of integrity and
          excellence. Our commitment extends beyond academic excellence to
          character building, ensuring our graduates serve with honor, courage,
          and unwavering dedication to justice.”
        </blockquote>

        <div className="commandant-info">
          <h3>Dr. Lazaro B. Mambosasa, DCP</h3>
          <p>Deputy Commissioner of Police · Commandant</p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Programs Section */}
     <section className="programs-section">
  <div className="container">
    <div className="section-header">
      <h2>Programs & Courses</h2>
    </div>

    <div className="programs-grid">
      {programs.map((program, index) => (
        <div className="program-card" key={index}>
          
          {/* Image */}
          <div className="program-image">
            <img src={program.image} alt={program.title} />
          </div>

          {/* Content */}
          <div className="program-content">
            <h3 style={{ color: program.color }}>{program.title}</h3>
            <p>{program.description}</p>
            <a href="/programs" className="program-link">
              View Details →
            </a>
          </div>

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

         {/* Facilities Section */}
     <section className="facilities-showcase">
  <div className="container">

    <div className="facilities-tabs">
      <button className="active">ICT Labs</button>
      <button>Sports Areas</button>
      <button>Library</button>
    </div>

    <div className="facilities-cards">
      {facilities.map((facility, index) => (
        <div className="facility-image-card" key={index}>
          <img src={facility.image} alt={facility.name} />

          <div className="facility-overlay">
            <span className="facility-category">
              {facility.category}
            </span>

            <h3>{facility.name}</h3>
            <p>{facility.description}</p>

            <button className="facility-btn">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="facilities-footer">
      <button className="explore-btn">
        Explore All Facilities
      </button>
    </div>

  </div>
</section>

    </div>
  );

}