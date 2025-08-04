// src/sections/Categories.jsx
import React from 'react';
import './css/Categories.css';

export default function Categories() {
  const diseases = [
    {
      name: 'Melanoma',
      description: 'A serious form of skin cancer that develops in melanocytes.',
      color: '#ffcccb'
    },
    {
      name: 'Psoriasis',
      description: 'A chronic autoimmune condition causing skin cells to build up rapidly.',
      color: '#ffdab9'
    },
    {
      name: 'Eczema',
      description: 'A condition causing skin to become itchy, red, dry and cracked.',
      color: '#e6e6fa'
    },
    {
      name: 'Acne',
      description: 'A skin condition that occurs when hair follicles are clogged with oil and dead skin cells.',
      color: '#b0e0e6'
    },
    {
      name: 'Rosacea',
      description: 'A common skin condition that causes redness and visible blood vessels in your face.',
      color: '#d8bfd8'
    }
  ];
    
  return (
    <section id="categories">
      <div className="categories-container">
        <h2>Categories We Predict</h2>
        <p className="categories-description">
          Our AI system is trained to recognize and predict these common skin conditions.
          Early detection can lead to better treatment outcomes.
        </p>
        
        <div className="categories-grid">
          {diseases.map((disease, index) => (
            <div 
              className="category-card" 
              key={index}
              style={{ backgroundColor: disease.color }}
            >
              <h3>{disease.name}</h3>
              <p>{disease.description}</p>
              <div className="learn-more">
                <div className="arrow-icon">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}