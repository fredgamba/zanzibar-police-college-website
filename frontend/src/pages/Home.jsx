// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

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
  PlayCircle,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../utils/api";

export default function Home() {
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState({
    news: [],
    announcements: [],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const [activeFilter, setActiveFilter] = useState("news");
  const [now, setNow] = useState(new Date());

  const handleApply = () => {
    window.open("https://dpa.tpf.go.tz/", "_blank");
  };

  const handleLearnMore = () => {
    navigate("/pages/About");
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".facility-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, postsRes, galleryRes] = await Promise.all([
          api.get("public/posts/"), // or /public/content/ if needed
          api.get("public/home-feed/"), // new endpoint
          api.get("public/gallery"), // new endpoint
        ]);

        setContent(contentRes.data);
        //setGallery(galleryRes)
        // postsRes.data is now already structured
        setPosts(postsRes.data);
        console.log("Fetched posts:", postsRes.data);
      } catch (err) {
        console.error("Error loading home content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const programs = [
    {
      title: "Academic Courses",
      slug: "academic-courses",
      description:
        "Advanced educational programs offering undergraduate degrees and specialized certifications.",
      images: [
        "/images/academic1.jpg",
        "/images/slider4.jpg",
        "/images/academic2.jpg",
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
        "/images/promotional1.jpg",
        "/images/promotional2.jpg",
      ],
      color: "#5b21b6",
    },
    {
      title: "Proficiency Courses",
      slug: "proficiency-courses",
      description:
        "Specialized training programs focusing on technical skills and tactical operations.",
      images: [
        "/images/profiency.jpg",
        "/images/profiency1.jpg",
        "/images/profiency2.jpg",
      ],
      color: "#9a3412",
    },
  ];

  const facilities = [
    {
      title: "Modern Classrooms",
      slug: "Modern Classrooms",
      color: "#1d4ed8",
      description:
        "Smart learning environments equipped with modern teaching technology.",
      link: "/facilities/library",
      images: [
        "/images/academic1.jpg",
        "/images/academic.jpg",
        "/images/academic2.jpg",
      ],
    },
    {
      title: "Training Grounds",
      slug: "training-grounds",
      color: "#0ea5e9",
      description:
        "Professional outdoor training environments for practical exercises.",
      link: "/facilities/range",
      images: [
        "/images/parade.jpg",
        "/images/parade1.jpg",
        "/images/parade2.jpg",
      ],
    },
    {
      title: "Student Hostels",
      slug: "Student-hostel",
      color: "#0ea5e9",
      description: "Comfortable and secure accommodation for all cadets.",
      link: "/facilities/classes-accommodation",
      images: [
        "/images/hostel.jpg",
        "/images/slider1.jpg",
        "/images/hostel1.jpg",
      ],
    },
  ];

  const slides = [
    {
      image: "/images/slider2.jpg",
      title: "Welcome to the Center of Excellence",
      subtitle: "Where Discipline Meets Leadership",
    },
    {
      image: "/images/slider4.jpg",
      title: "Shape the Future of Law Enforcement",
      subtitle: "Join Tanzania Police Academy",
    },
    {
      image: "/images/slider3.jpg",
      title: "Excellence in Training, Integrity in Service",
      subtitle: "Building Professional Officers",
    },
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

  if (loading)
    return (
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
      <style>
        {`
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
      `}
      </style>

      {/* Hero Carousel */}
      <div className="hero-carousel">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img src={slide.image} alt={slide.title} />

              <div className="slide-overlay">
                <div className="slide-content">
                  <span className="slide-tag">
                    Zanzibar Police College
                  </span>
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>

                  <div className="slide-buttons">
                    <button className="btn-primary" onClick={handleApply}>
                      Apply Now
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
                src="/images/CO-ZPC.jpg"
                alt="Augustino Senga-ACP - Commandant"
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
                “At Zanzibar police college, we shape officers of integrity
                and excellence. Our commitment extends beyond academic
                excellence to character building, ensuring our graduates serve
                with honor, courage, and unwavering dedication to justice.”
              </blockquote>

              <div className="commandant-info">
                <h3>Augustino Senga, ACP</h3>
                <p>Assistant Commissioner of Police · Commandant</p>
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
                  <Link
                    to={`/programs/${program.slug}`}
                    className="program-link"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* News & Events Section */}
      <section className="news-events-section">
        <div className="container">
          <h2>News & Upcoming Events</h2>
          <div className="news-filters">
            {["news", "events", "announcements"].map((type) => (
              <button
                key={type}
                className={`filter-btn ${
                  activeFilter === type ? "active" : ""
                }`}
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
              {activeFilter === "news" &&
                posts.news.length > 0 &&
                (() => {
                  // ✅ Parse ISO date strings (YYYY-MM-DD)
                  const parseDate = (dateStr) => {
                    if (!dateStr) return 0;
                    const [year, month, day] = dateStr.split("-").map(Number);
                    return new Date(year, month - 1, day).getTime();
                  };

                  const sortedNews = [...posts.news]
                    .filter((item) => item.date_posted)
                    .sort((a, b) => {
                      const dateDiff =
                        parseDate(b.date_posted) - parseDate(a.date_posted);
                      if (dateDiff !== 0) return dateDiff;
                      return b.id - a.id;
                    });

                  // Hero = latest news, next 3 = secondary cards
                  const featured = sortedNews[0];
                  const sideNews = sortedNews.slice(1, 4);

                  return (
                    <div className="modern-news-layout">
                      {/* HERO STORY */}
                      <div className="split-hero-card">
                        <div className="featured-ribbon">★ Featured </div>

                        {/* LEFT CONTENT */}
                        <div className="hero-content">
                          <h1>{featured.title}</h1>

                          <div className="hero-meta">
                            <span className="meta-pill admin-pill">
                              <User size={12} />
                              Admin
                            </span>
                            <span className="meta-pill calendar-pill">
                              <Calendar size={12} />
                              {new Date(
                                featured.date_posted
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="hero-summary">
                            {featured.content?.slice(0, 220)}...
                          </p>

                          <Link
                            to={`/news/${featured.id}`}
                            className="hero-cta"
                          >
                            Read More
                          </Link>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="hero-image">
                          <img
                            src={`${BASE_URL}${featured.image}`}
                            alt={featured.title}
                          />
                        </div>
                      </div>

                      {/* SECONDARY STORIES */}
                      <div className="secondary-news-grid">
                        {sideNews.map((news) => (
                          <div key={news.id} className="secondary-card">
                            {/* Featured Ribbon */}
                            {news.is_featured && (
                              <div className="featured-ribbon-corner">
                                ★ Featured News
                              </div>
                            )}

                            <div className="secondary-image-wrapper">
                              <img
                                src={`${BASE_URL}${news.image}`}
                                alt={news.title}
                              />
                            </div>

                            <div className="secondary-content">
                              {/* Tags */}
                              <div className="secondary-tags">
                                <span className="meta-pill admin-pill">
                                  <User size={10} /> Admin
                                </span>

                                <span className="meta-pill calendar-pill">
                                  <Calendar size={10} />{" "}
                                  {new Date(
                                    news.date_posted
                                  ).toLocaleDateString()}
                                </span>
                              </div>

                              <h3>{news.title}</h3>

                              <Link
                                to={`/news/${news.id}`}
                                className="read-more-btn"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View All News */}
                      <div className="view-all-news-wrapper">
                        <Link to="/news" className="view-all-news-btn">
                          View All News →
                        </Link>
                      </div>
                    </div>
                  );
                })()}
               
               
              {/* EVENTS SECTION */}
              {activeFilter === "events" && (
                <section className="events-section">

                  {/* Section Title */}
                  <div className="events-header">
                    <h2>Upcoming Events</h2>
                    <p>Stay updated with our upcomming Events</p>
                  </div>

                  <div className="events-grid-layout">
                    {posts.events.map((event) => {
                      const eventDate = new Date(event.created_at);
                      const today = new Date();

                      const day = eventDate.getDate();
                      const month = eventDate.toLocaleString("default", {
                        month: "short",
                      });
                      const year = eventDate.getFullYear();

                      // Calculate days left
                      today.setHours(0, 0, 0, 0);
                      eventDate.setHours(0, 0, 0, 0);

                      const differenceInTime =
                        eventDate.getTime() - today.getTime();
                      const daysLeft = Math.ceil(
                        differenceInTime / (1000 * 60 * 60 * 24)
                      );

                      return (
                        <div key={event.id} className="event-card">
                          {event.image && (
                            <div className="event-card-image">
                              <img
                                src={`${BASE_URL}${event.image}`}
                                alt={event.title}
                              />

                              {/* Date Badge */}
                              <div className="event-date-badge">
                                <span className="month">{month}</span>
                                <span className="day">{day}</span>
                                <span className="year">{year}</span>
                              </div>
                            </div>
                          )}

                          <div className="event-card-content">
                            <h3>{event.title}</h3>

                            <p>{event.content?.slice(0, 120)}...</p>

                            {/* Days Left Display */}
                            <div
                              className={`days-left ${
                                daysLeft > 0
                                  ? "upcoming"
                                  : daysLeft === 0
                                  ? "today"
                                  : "completed"
                              }`}
                            >
                              {daysLeft > 0 &&
                                `${daysLeft} day${
                                  daysLeft > 1 ? "s" : ""
                                } left`}
                              {daysLeft === 0 && "Happening Today 🎉"}
                              {daysLeft < 0 && "Event Completed"}
                            </div>

                            <Link
                              to={`/events/${event.id}`}
                              className="read-more-link"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ANNOUNCEMENTS SECTION */}
              {activeFilter === "announcements" && (
                <div className="announcements-section">
                  <div className="events-header">
                    <h2>Announcements</h2>
                    <p>Stay updated with our Announcements</p>
                  </div>
                  <div className="announcements-grid">
                    {posts.announcements?.map((item) => (
                      <div key={item.id} className="announcement-card">
                        <div className="announcement-header">
                          <div className="announcement-icon">📢</div>
                          <div className="announcement-meta">
                            <h3>{item.title}</h3>
                            <span className="announcement-date">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <p className="announcement-text">{item.content}</p>
                        {item.pdf && (
                          <a href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdf-attachment">
                            📄 View Attachment
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

            {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Facilities</h2>
          </div>

          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div className="facility-card" key={index}>
                {/* Animated Image Stack */}
                <div className="facility-image">
                  {facility.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={facility.title}
                      style={{ animationDelay: `${i * 4}s` }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="facility-content">
                  <h3 style={{ color: facility.color }}>{facility.title}</h3>

                  <p>{facility.description}</p>

                  <Link to={facility.link} className="facility-link">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}