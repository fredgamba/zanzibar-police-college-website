import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* ===========================
   COMPONENT
=========================== */

export default function CampusTour() {

  /* ===========================
     DATA
  =========================== */

  const classBuildings = [
    {
      name: "Science Block",
      img: "/images/class1.jpg",
      desc: "Equipped with modern laboratories for physics, chemistry, and biology, smart boards, interactive projectors, collaborative workspaces, and natural lighting."
    },
    {
      name: "Arts Block",
      img: "/images/class1.jpg",
      desc: "Spacious studios for painting, sculpture, and performing arts with advanced audio-visual equipment."
    },
    {
      name: "Engineering Block",
      img: "/images/class1.jpg",
      desc: "High-tech labs with 3D printers, robotics stations, CAD software, and simulation tools."
    },
    {
      name: "Library Block",
      img: "/images/class1.jpg",
      desc: "Multi-level library with digital research labs, group study rooms, e-books, and journals."
    },
  ];

  const dormitories = [
    {
      name: "Alpha Dorm",
      img: "/images/class1.jpg",
      desc: "Air-conditioned rooms with Wi-Fi, common study areas, lounges, and storage."
    },
    {
      name: "Beta Dorm",
      img: "/images/class1.jpg",
      desc: "Modern rooms with ergonomic furniture, high-speed internet, and 24/7 security."
    },
    {
      name: "Gamma Dorm",
      img: "/images/class1.jpg",
      desc: "Cozy rooms with scenic views, gym, table tennis, and communal lounges."
    },
    {
      name: "Delta Dorm",
      img: "/images/class1.jpg",
      desc: "Spacious living areas with rooftop gardens, group study rooms, and green surroundings."
    },
  ];

  const stats = [
    { title: "Buildings", value: 4, icon: "🏫" },
    { title: "Dormitories", value: 4, icon: "🛌" },
    { title: "Classrooms", value: 100, icon: "📚" },
    { title: "Labs", value: 20, icon: "🔬" },
  ];

  /* ===========================
     SLIDER SETTINGS
  =========================== */

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // arrows removed
    pauseOnHover: true,
  };

  /* ===========================
     CARD COMPONENT
  =========================== */

  const Card = ({ item }) => {
    const descRef = useRef(null);

    return (
      <div className="px-2">
        <div className="card h-100 shadow-sm">
          <img 
            src={item.img} 
            className="card-img-top" 
            alt={item.name} 
            style={{ height: "24rem", objectFit: "cover" }} // taller image
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-center">{item.name}</h5>
            <p ref={descRef} className="card-text text-truncate">{item.desc}</p>
          </div>
        </div>
      </div>
    );
  };

  /* ===========================
     RENDER
  =========================== */

  return (
    <div className="container-fluid py-5"> {/* wider layout */}

      {/* ===== TOP HEADER ===== */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary mb-3">Explore Our Campus</h1>
        <h2 className="h4 text-secondary mb-3">
          Discover the facilities, dormitories, and classrooms that make our campus exceptional.
        </h2>
        <p className="text-muted">
          Take a virtual tour through our state-of-the-art buildings, comfortable dorms, and inspiring classrooms. 
          Get a feel for life at our campus, from academic spaces to recreational areas, all designed for a rich student experience.
        </p>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="row text-center mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-3 mb-3">
            <div className="card shadow-sm py-4 h-100">
              <div className="h1 mb-2">{stat.icon}</div>
              <h5 className="fw-bold">{stat.value}</h5>
              <p className="mb-0 text-muted">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== TWO COLUMN SLIDERS ===== */}
      <div className="row">
        {/* DORMITORIES */}
        <div className="col-12 col-md-6 mb-4">
          <h3 className="text-center text-success mb-3">Dormitories</h3>
          <Slider {...settings}>
            {dormitories.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </Slider>
        </div>

        {/* CLASS BUILDINGS */}
        <div className="col-12 col-md-6 mb-4">
          <h3 className="text-center text-primary mb-3">Class Buildings</h3>
          <Slider {...settings}>
            {classBuildings.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </Slider>
        </div>
      </div>

    </div>
  );
}
