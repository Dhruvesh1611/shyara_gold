import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/RingsSection.css"; // Keeping the same CSS file

const JEWELRY_TYPES = [
  "All",
  "Yellow Gold",
  "Yellow Gold with Diamond",
  "Rose Gold",
  "Rose Gold with Diamond",
  "Platinum",
  "Silver",
  "White Gold",
];

const EarringsSection = () => {
  const [earrings, setEarrings] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/earrings")
      .then((res) => res.json())
      .then((data) => setEarrings(data))
      .catch((error) => console.error("Error fetching earrings:", error));
  }, []);

  const filteredEarrings = earrings.filter(
    (earring) => selectedType === "All" || earring.type === selectedType
  );

  return (
    <div className="earrings-section">
      <div className="hero">
        <div className="hero-overlay1_EARRINGS"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>EAR RINGS</h1>
            <p>Elegance that completes your look</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Earrings</span>
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
            {filteredEarrings.map((earring) => (
              <div key={earring._id} className="product-card">
                <div className="product-image">
                  <img src={earring.imageUrls?.[0]} alt={earring.name} />
                </div>
                <div className="product-info">
                  <h3>{earring.name}</h3>
                  <p>{earring.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarringsSection;
