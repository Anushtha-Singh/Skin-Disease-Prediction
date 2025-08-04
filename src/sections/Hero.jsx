// src/sections/Hero.jsx
import React from 'react';
import './css/Hero.css';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="slide-up">Skin Disease Prediction</h1>
          <p className="hero-subtitle slide-up">
            Using advanced AI to help detect skin issues early and accurately.
          </p>
          <div className="hero-buttons slide-up">
            <a href="#upload" className="primary-btn">
              Try Now
            </a>
            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>
        
        <div className="hero-image fade-in">
          <div className="image-placeholder">
            {/* This is a placeholder for an illustration */}
            <div className="placeholder-icon">🔬</div>
          </div>
        </div>
      </div>
    </section>
  );
}