import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/RingsSection.css"; // Keeping the same CSS file

const JEWELRY_TYPES = [
  "All",
  "Yellow Gold",
  "Yellow Gold with diamond",
  "Rose Gold",
  "Rose Gold With Diamond",
  "Platinum",
  "Silver",
];

const BraceletsSection = () => {
  const [bracelets, setBracelets] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/bracelets")
      .then((res) => res.json())
      .then((data) => setBracelets(data))
      .catch((error) => console.error("Error fetching bracelets:", error));
  }, []);

  const filteredBracelets = bracelets.filter(
    (bracelet) => selectedType === "All" || bracelet.type === selectedType
  );

  return (
    <div className="bracelets-section">
      <div className="hero">
        <div className="hero-overlay1_BRACELETS"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>BRACELETS</h1>
            <p>Elegant designs for your wrist</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Bracelets</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="sidebar">
          <h2>Filter</h2>
          <div>
            <h3>Jewellery Type</h3>
            <ul className="filter-list">
              {JEWELRY_TYPES.map((type) => (
                <li key={type}>
                  <button
                    className={selectedType === type ? "active" : ""}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="products-section">
          <div className="section-header">
            <button className="section-title">{selectedType}</button>
          </div>

          <div className="products-grid">
            {filteredBracelets.map((bracelet) => (
              <div key={bracelet._id} className="product-card">
                <div className="product-image">
                  <img src={bracelet.imageUrls?.[0]} alt={bracelet.name} />
                </div>
                <div className="product-info">
                  <h3>{bracelet.name}</h3>
                  <p>{bracelet.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BraceletsSection;
