// src/sections/Guide.jsx
import React from 'react';
import './css/Guide.css';

export default function Guide() {
  return (
    <section id="guide">
      <div className="guide-container">
        <h2>Guided By</h2>
        
        <div className="guide-card-wrapper">
          <div className="guide-card">
            {/* <div className="guide-image">
              <img src="/api/placeholder/200/200" alt="Mrs. Neha Mehra" />
            </div> */}
            <div className="guide-info">
              <h3>Mrs. Neha Mehra</h3>
              <p className="guide-title">Assistant Professor at Shri G S Institute of Technology & Science</p>
              {/* <p className="guide-description">
                With expertise in machine learning and computer vision, Mrs. Bamne has guided our team
                throughout the development of this project, providing valuable insights and direction.
              </p> */}
              <div className="guide-quote">
                {/* <blockquote>
                  "Early detection through technology can transform healthcare outcomes. This project represents
                  a step forward in making skin disease detection more accessible to everyone."
                </blockquote> */}
              </div>
            </div>
          </div>

          <div className="guide-card">
            {/* <div className="guide-image">
              <img src="/api/placeholder/200/200" alt="Mrs. Himani Mishra" />
            </div> */}
            <div className="guide-info">
              <h3>Mrs. Himani Mishra</h3>
              <p className="guide-title">Assistant Professor at Shri G S Institute of Technology & Science</p>
              {/* <p className="guide-description">
                With a passion for technology and innovation, Mrs. Mishra supported us with key reviews and feedback
                at every critical stage of the project, helping shape the final outcome.
              </p> */}
              <div className="guide-quote">
                {/* <blockquote>
                  "Projects like these highlight the potential of young minds when nurtured in the right direction."
                </blockquote> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
