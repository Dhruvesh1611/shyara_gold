import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Collection.css";

// Import video (Ensure it's in MP4 format)
import ringVideo from "/assets/video/ringVideo.mov";

// Import images properly
import ringsImg from "/assets/img/rings.png";
import banglesImg from "/assets/img/bengals.png";
import necklacesImg from "/assets/img/necklaces.png";
import chainsImg from "/assets/img/chains.png";
import mangalsutraImg from "/assets/img/mangalsutra.png";
import earringsImg from "/assets/img/earrings.png";
import braceletsImg from "/assets/img/bracelets.png";
import pendantsImg from "/assets/img/pendants.png";

const HeroSection = () => (
  <div className="hero-container">
    <video className="hero-video" autoPlay loop muted>
      <source src={ringVideo} type="video/mp4" />
      <source src="/assets/video/ringVideo.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <h1 className="luxury-title">Shyara Gold</h1>
      <p className="luxury-subtitle">Your Style, Your Statement</p>
    </div>      
  </div>
  
);

const CollectionSection = () => {
  const navigate = useNavigate();

  const collections = [
    { title: 'RINGS', image: ringsImg, path: '/collection/ring' },  // FIXED PATH
    { title: 'BANGLES', image: banglesImg, path: '/collection/bangles' },
    { title: 'NECKLACES', image: necklacesImg, path: '/collection/necklaces' },
    { title: 'CHAINS', image: chainsImg, path: '/collection/chains' },
    { title: 'MANGALSUTRA', image: mangalsutraImg, path: '/collection/mangalsutra' },
    { title: 'EARRINGS', image: earringsImg, path: '/collection/earrings' },
    { title: 'BRACELETS', image: braceletsImg, path: '/collection/bracelets' },
    { title: 'PENDANTS', image: pendantsImg, path: '/collection/pendants' }
  ];

  return (
    <div className="collection-section">
      <h2 className="bounce-in">COLLECTION</h2>
      <div className="collection-grid">
        {collections.map((item, index) => (
          <div 
            key={index} 
            className="collection-card scale-in"
            onClick={() => navigate(item.path)}
          >
            <img src={item.image} alt={item.title} />
            <div className="collection-overlay">
              <span className="text-focus-in">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="add-collection-btn pulse" 
        onClick={() => navigate("/users-collection")}
        aria-label="Add a new jewelry collection"
      >
        Add Collection
      </button>
    </div>
  );
};

const JewelryMainContent = () => (
  <div>
    <Navbar />
    <main className="main-content1">
      <HeroSection />
      <CollectionSection />
    </main>
    <Footer />
  </div>
);

export default JewelryMainContent;
