// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero">SkinAI</a>
        </div>
        
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          <li><a href="#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a></li>
          <li><a href="#upload" onClick={() => setMobileMenuOpen(false)}>Upload</a></li>
          <li><a href="#team" onClick={() => setMobileMenuOpen(false)}>Team</a></li>
          <li><a href="#guide" onClick={() => setMobileMenuOpen(false)}>Guide</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;