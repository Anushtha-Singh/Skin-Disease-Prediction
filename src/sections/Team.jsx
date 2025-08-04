// src/sections/Team.jsx
import React from 'react';
import './css/Team.css'; // We'll create this next

export default function Team() {
  const members = [
    {
      name: 'Anushtha Singh Kushwah',
      Enrollment : '0801CS233D01',
      // role: 'Team Lead',
      // image: '/api/placeholder/150/150' // Replace with actual image path
    },
    {
      name: 'Shreyash Tiwari',
      Enrollment : '0801CS233D09',
      // role: 'Developer',
      // image: '/api/placeholder/150/150' // Replace with actual image path
    },
    {
      name: 'Mohan Manjhi',
      Enrollment : '0801CS233D05',
      // role: 'ML Engineer',
      // image: '/api/placeholder/150/150' // Replace with actual image path
    },
    {
      name: 'Harshita Bamniya',
      Enrollment : '0801CS233D04',
      // role: 'UI/UX Designer',
      // image: '/api/placeholder/150/150' // Replace with actual image path
    },
    {
      name: 'Shivani Choudhary',
      Enrollment : '0801CS233D08',
      // role: 'Data Scientist',
      // image: '/api/placeholder/150/150' // Replace with actual image path
    }
  ];
  
  return (
    <section id="team">
      <div className="team-container">
        <h2>Meet Our Team</h2>
        <div className="team-cards-container">
          {members.map((member, idx) => (
            <div className="team-card" key={idx}>
              {/* <div className="team-card-image">
                <img src={member.image} alt={member.name} />
              </div> */}
              <div className="team-card-info">
                <h3>{member.name}</h3>
                <p>{member.Enrollment}</p>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}