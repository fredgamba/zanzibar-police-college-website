
// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  Tag,
  User,
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const [activeFilter, setActiveFilter] = useState("news");


  const navigate = useNavigate();

const handleApply = () => {
  window.open("https://dpa.tpf.go.tz/", "_blank");
};

const handleLearnMore = () => {
  navigate("/pages/About");
};


  useEffect(() => {
  const fetchData = async () => {
    try {
      const [contentRes, postsRes, galleryRes] = await Promise.all([
        api.get('public/posts/'),   // or /public/content/ if needed
        api.get('public/home-feed/'), // new endpoint
        api.get('public/gallery') // new endpoint
      ]);
      
      setContent(contentRes.data);
      //setGallery(galleryRes)
      // postsRes.data is now already structured
      setPosts(postsRes.data);
      console.log('Fetched posts:', postsRes.data);
    } catch (err) {
      console.error('Error loading home content:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

//prevent background scroll
useEffect(() => {
  if (selectedEvent) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [selectedEvent]);

//close the modal with ESC key
useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setSelectedEvent(null);
    }
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
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
     slug: "academic-courses",
    description:
      "Advanced educational programs offering undergraduate degrees and specialized certifications.",
    images: [
      "/images/academic.jpg",
      "/images/promotional.jpg",
      "/images/academic.jpg",
    ],
    color: "#065f46",
  },
  {
    title: "Promotional Courses",
     slug: "promotional-courses",
    description:
      "Leadership and skill enhancement training designed to prepare officers for higher ranks.",
    images: [
      "/images/promotional.jpg",
      "/images/academic.jpg",
      "/images/promotional.jpg",
    ],
    color: "#5b21b6",
  },
  {
    title: "Proficiency Courses",
     slug: "proficiency-courses",
    description:
      "Specialized training programs focusing on technical skills and tactical operations.",
    images: [
     "/images/promotional.jpg",
      "/images/campus4.jpg",
      "/images/campus2.jpg",
    ],
    color: "#9a3412",
  },
];

const facilities = [
  {
    category: "ICT Labs",
    name: "Networking Lab",
     images: [
      "/images/campus4.jpg",
      "/images/campus3.jpg",
      "/images/promotional.jpg",
    ],
    description: "Specialized lab for network administration and cybersecurity training.",
    progress: 85
  },
  {
    category: "ICT Labs",
    name: "Computer Lab",
     images: [
      "/images/promotional.jpg",
      "/images/academic.jpg",
      "/images/campus2.jpg",
    ],
    description: "State-of-the-art technology for digital forensics and research.",
     progress: 90
  },
  {
    category: "Sports Areas",
    name: "Basketball Courts",
    images: [
      "/images/campus3.jpg",
      "/images/academic.jpg",
      "/images/promotional.jpg",
    ],
    description: "Multiple indoor and outdoor basketball courts for training and competitions.",
    progress: 75
  },
  {
    category: "Library",
    name: "Modern Library",
     images: [
      "/images/promotional.jpg",
      "/images/academic.jpg",
      "/images/campus1.jpg",
    ],
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


  const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

  return (
    <div className="home-page">
      <style>{`
       .news-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          margin-right: 5%;
          border-radius: 8px;
          margin-bottom: 12px; /* 👈 adds gap below the image */
        }

        .news-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }


      `}</style>

      {/* {ga.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <div className="news-list">
          {newsList.map(item => (
            <div key={item.id} className="news-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2>{item.title}</h2>
                <p className="news-date">
                  <em>{new Date(item.date_posted).toLocaleDateString()}</em>
                </p>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Hero Carousel */}
     <div className="hero-carousel">
  <Slider {...settings}>
    {slides.map((slide, index) => (
      <div key={index} className="hero-slide">
        <img src={slide.image} alt={slide.title} />

        <div className="slide-overlay">
          <div className="slide-content">
            <span className="slide-tag">Dar es salaam Police Academy</span>
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>

           <div className="slide-buttons">
  <button className="btn-primary" onClick={handleApply}>
    Apply Now
  </button>

  <button className="btn-outline" onClick={handleLearnMore}>
    Learn More
  </button>
</div>

          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>


  {/* Commandant Message Section */}
  
  <section className="hero-commandant">
  <video
    className="hero-video"
    src="/videos/campus-hero.mp4" 
    autoPlay
    muted
    loop
    playsInline >

  </video>

  {/* Overlay & Floating Shapes */}
  <div className="hero-overlay"></div>
  <div className="floating-shape shape-1"></div>
  <div className="floating-shape shape-2"></div>

  {/* Hero Card with 3D tilt */}
  <div className="container">
    <div
      className="hero-card"
      data-tilt
      data-tilt-max="15"
      data-tilt-speed="400"
    >
      {/* Commandant Image */}
      <div className="hero-image" data-aos="fade-right">
        <img
          src="/images/mambosasa.jpg"
          alt="Dr. Lazaro B. Mambosasa-DCP - Commandant"
        />
        <div className="commandant-badge">
          <Award size={24} />
        </div>
      </div>

      {/* Commandant Message */}
      <div className="hero-message" data-aos="fade-left">
        <span className="section-tag">Leadership Message</span>
        <h1>
          <span className="typing-text">
            Shaping Officers of Integrity & Excellence
          </span>
        </h1>

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

      {/* Animated Image Stack */}
      <div className="program-image">
        {program.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={program.title}
            style={{ animationDelay: `${i * 4}s` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="program-content">
        <h3 style={{ color: program.color }}>{program.title}</h3>
        <p>{program.description}</p>
        <Link to={`/programs/${program.slug}`}
      className="program-link">
  View Details →
       </Link>

      </div>

    </div>
  ))}
</div>

  </div>
</section>


      {/* News & Events Section */}
     {/* News & Events Section */}
<section className="news-events-section">
  <div className="container">
    <h2>News & Announcements</h2>
    <div className="news-filters">
  {["news", "events", "announcements"].map((type) => (
    <button
      key={type}
      className={`filter-btn ${activeFilter === type ? "active" : ""}`}
      onClick={() => setActiveFilter(type)}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
</div>

    <div className="news-events-grid">
      {/* News Section */}
      <div className="news-content-area">

  {/* NEWS FILTER VIEW */}
  {activeFilter === "news" && posts.news.length > 0 && (() => {
    const sortedNews = [...posts.news].sort(
      (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
    );

    const featured = sortedNews[0];
    const sideNews = sortedNews.slice(1, 5);

    return (
      <div className="news-layout">

        {/* Featured Left */}
       <div className="news-card featured-card">

  <div className="news-card-image">
    <img
      src={`${BASE_URL}${featured.image}`}
      alt={featured.title}
    />
    <span className="news-badge">Featured News</span>
  </div>

  <div className="news-card-body">
    <h3>{featured.title}</h3>

  <div className="news-meta">

  <span className="news-tag category-tag glow-tag">
    <Tag size={14} />
    {featured.category || "General"}
  </span>

  <span className="news-tag date-tag">
    <Calendar size={14} />
    {new Date(featured.date_posted).toLocaleDateString()}
  </span>

  <span className="news-tag author-tag">
    <User size={14} />
    Admin
  </span>

  <span className="news-tag readtime-tag">
    <Clock size={14} />
    {calculateReadingTime(featured.content)}
  </span>

</div>
    <p className="featured-description">
  {featured.content?.slice(0, 420)}...
</p>

    <Link to={`/news/${featured.id}`} className="read-more-link">
      Read more →
    </Link>
  </div>

</div>


        {/* Right Small Cards */}
        <div className="small-news-list">
         {sideNews.map((news) => (
  <div key={news.id} className="news-card">

    <div className="news-card-image">
      <img
        src={`${BASE_URL}${news.image}`}
        alt={news.title}
      />
      <span className="news-badge">Latest News</span>
    </div>

    <div className="news-card-body">
      <h4>{news.title}</h4>
<div className="news-meta">

 

  <span className="news-tag date-tag">
    <Calendar size={14} />
    {new Date(news.date_posted).toLocaleDateString()}
  </span>

  <span className="news-tag author-tag">
    <User size={14} />
    Admin
  </span>

  <span className="news-tag readtime-tag">
    <Clock size={14} />
    {calculateReadingTime(news.content)}
  </span>

</div>
      <Link to={`/news/${news.id}`} className="read-more-link">
        Read more →
      </Link>
    </div>

  </div>
))}

        </div>

      </div>
    );
  })()}

  {/* EVENTS FILTER VIEW */}
  {activeFilter === "events" && (
    <div className="events-only-layout">
      {posts.events.map((event) => (
        <div key={event.id} className="event-item">
          {event.image && (
            <div className="event-image">
              <img src={`${BASE_URL}${event.image}`} alt={event.title} />
            </div>
          )}

          <div className="event-content">
            <div className="news-date">
              {new Date(event.created_at).toLocaleDateString()}
            </div>

            <h3>{event.title}</h3>
            <p>{event.content?.slice(0, 120)}...</p>

            <button
              className="view-more-btn"
              onClick={() => setSelectedEvent(event)}
            >
              View More →
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* ANNOUNCEMENTS FILTER VIEW */}
  {activeFilter === "announcements" && (
    <div className="announcements-only-layout">
      {posts.announcements?.map((item) => (
        <div key={item.id} className="announcement-item">
          <div className="announcement-badge">!</div>
          <div>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )}

</div>

    

            {/* Events Section */}
           

          </div>
        </div>
      </section>


    {/* EVENT MODAL */}
{selectedEvent && (
  <div
    className="event-modal-overlay"
    onClick={() => setSelectedEvent(null)}
  >
    <div
      className="event-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close-btn"
        onClick={() => setSelectedEvent(null)}
      >
        ✕
      </button>

      {/* Event Image */}
      {selectedEvent.image && (
        <div className="modal-image">
          <img
            src={`${BASE_URL}${selectedEvent.image}`}
            alt={selectedEvent.title}
          />
        </div>
      )}

      <h2>{selectedEvent.title}</h2>

      <div className="modal-date">
        {new Date(selectedEvent.created_at).toLocaleDateString()}
      </div>

      <p className="modal-content">
        {selectedEvent.content}
      </p>
    </div>
  </div>
)}





{/* Facilities Section */}
<FacilitiesShowcase facilities={facilities} />

    </div> 
  );
}


/* ✅ COMPONENT OUTSIDE JSX */

const FacilitiesShowcase = ({ facilities }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFacilities =
    activeCategory === "All"
      ? facilities
      : facilities.filter(
          (facility) => facility.category === activeCategory
        );

  return (
    <section className="facilities-showcase">
      <div className="container">

        {/* Tabs */}
        <div className="facilities-tabs">
          {["All", "ICT Labs", "Sports Areas", "Library"].map((tab) => (
            <button
              key={tab}
              className={activeCategory === tab ? "active" : ""}
              onClick={() => setActiveCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="facilities-cards">
          {filteredFacilities.map((facility, index) => (
            <div className="facility-image-card" key={index}>
              <div className="facility-image">
                {facility.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={facility.name}
                    style={{ animationDelay: `${i * 4}s` }}
                  />
                ))}
              </div>

              <div className="facility-overlay">
                <span className="facility-category">
                  {facility.category}
                </span>
                <h3>{facility.name}</h3>
                <p>{facility.description}</p>
                <button className="facility-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>


  );
  
};




