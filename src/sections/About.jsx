// src/sections/About.jsx
import React from 'react';
import './css/About.css';

export default function About() {
  const features = [
    {
      icon: "🔍",
      title: "Early Detection",
      description: "Our AI helps identify potential skin issues before they become serious problems."
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Simply upload an image or take a photo with your camera to get instant analysis."
    },
    {
      icon: "🧠",
      title: "Advanced AI",
      description: "Powered by deep learning algorithms trained on thousands of clinical images."
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your images and data are processed securely and never stored without consent."
    }
  ];

  return (
    <section id="about">
      <div className="about-container">
        <h2>About the Project</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              This project is aimed at predicting various skin diseases using deep learning and image classification.
              Our system allows users to upload an image or use a camera to get quick predictions about potential skin conditions.
            </p>
            <p>
              Early detection of skin issues can lead to better treatment outcomes and potentially save lives.
              While our tool provides valuable insights, it's always recommended to consult with a healthcare professional for proper diagnosis.
            </p>
          </div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}