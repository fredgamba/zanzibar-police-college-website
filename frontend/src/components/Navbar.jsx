

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  Building,
  Newspaper,
  Phone,
  Send,
  ChevronDown,
  Mail,
  PhoneCall,
  BookOpen,
  HelpCircle,
  Shield,
  UserCircle
} from 'lucide-react';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (name) => {
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // Quick Links for Top Bar
  const quickLinks = [
    { name: 'Tpf Service Portal', path: '/alumni', icon: Shield },
    { name: 'Admission', path: '/admission', icon: GraduationCap },
    { name: 'E-Learning', path: '/e-learning', icon: BookOpen },
    { name: 'Help Desk', path: '/help-desk', icon: HelpCircle },
    { name: 'Certificate Verification', path: '/certificate-verification', icon: Shield },
  ];

  // Dropdown Items - SWITCHED ADMISSION AND FACILITIES
  const aboutSubItems = [
    { label: 'History', path: '/about/history' },
    { label: 'Organization Structure', path: '/about/organization' },
    { label: 'Department', path: '/about/department' },
  ];

  // NOW FACILITIES ITEMS UNDER ADMISSION
  const admissionSubItems = [
    { label: 'Course', path: '/admission/course' },
    { label: 'Admission Requirements', path: '/admission/admission-requirements' },
    { label: 'Fee Structure', path: '/admission/fee-structure' },
    { label: 'Application Process', path: '/admission/application-process' },
  ];

  // NOW ADMISSION ITEMS UNDER FACILITIES
  const facilitiesSubItems = [
    { label: 'Sport & Gym', path: '/facilities/sport-gym' },
    { label: 'Recreation', path: '/facilities/recreation' },
    { label: 'Classes & Accommodation', path: '/facilities/classes-accommodation' },
    { label: 'Range', path: '/facilities/range' },
    { label: 'Library', path: '/facilities/library' },
    { label: 'Driving School', path: '/facilities/driving-school' },
    { label: 'Dispensary', path: '/facilities/dispensary' },
  ];

  return (
    <nav className="college-navbar">
      {/* Top Bar - Quick Links & Contact Info */}
      <div className="top-bar">
        <div className="contact-info">
          <span>
            <Mail size={14} className="contact-icon" />
            barua@dpacademy.go.tz
          </span>
          <span>
            <PhoneCall size={14} className="contact-icon" />
            +255 (0) 22 123 4567
          </span>
        </div>
        <nav className="quick-links">
          {quickLinks.map(link => {
            const IconComponent = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <IconComponent size={12} className="quick-link-icon" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Header - Logos + Centered Title */}
      <div className="main-header">
        <img
          src="/images/tanzania-coa.png"
          alt="Tanzania Coat of Arms"
          className="coa-logo"
        />
        <div className="school-name">
          <h1>THE UNITED REPUBLIC OF TANZANIA</h1>
          <h2>DAR ES SALAAM POLICE ACADEMY</h2>
          <p>"The Center of Excellence"</p>
        </div>
        <img
          src="/images/police-academy-logo.png"
          alt="Police Academy Logo"
          className="academy-logo"
        />
      </div>

      {/* Enhanced Navigation Menu with Dropdowns & Icons */}
      <div className="main-nav">
        <ul>
          {/* Home */}
          <li>
            <Link to="/">
              <Home size={18} className="nav-icon" />
              Home
            </Link>
          </li>

          {/* About Us Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              <Users size={18} className="nav-icon" />
              About Us 
              <ChevronDown size={14} className="dropdown-arrow" />
            </span>
            {openDropdown === 'about' && (
              <ul className="dropdown-menu">
                {aboutSubItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Admission Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter('admission')}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              <GraduationCap size={18} className="nav-icon" />
              Admission 
              <ChevronDown size={14} className="dropdown-arrow" />
            </span>
            {openDropdown === 'admission' && (
              <ul className="dropdown-menu">
                {admissionSubItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Facilities Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter('facilities')}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              <Building size={18} className="nav-icon" />
              Facilities 
              <ChevronDown size={14} className="dropdown-arrow" />
            </span>
            {openDropdown === 'facilities' && (
              <ul className="dropdown-menu">
                {facilitiesSubItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* News */}
          <li>
            <Link to="/news">
              <Newspaper size={18} className="nav-icon" />
              News
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link to="/contact">
              <Phone size={18} className="nav-icon" />
              Contact
            </Link>
          </li>

          {/* Apply Online Button */}
          <li className="apply-btn-li">
          </li>
        </ul>
      </div>
    </nav>
  );

}