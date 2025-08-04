// src/App.js
import React from 'react';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Categories from './sections/Categories';
import Upload from './sections/Upload';
import Team from './sections/Team';
import Guide from './sections/Guide';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Upload />
      <Team />
      <Guide />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Skin Disease Prediction | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;