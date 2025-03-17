import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/RingsSection.css";

const JEWELRY_TYPES = [
  "All",
  "Yellow Gold",
  "Yellow Gold with diamond",
  "Rose Gold",
  "Rose Gold With Diamond",
  "Platinum",
  "Silver",
];

const BanglesSection = () => {
  const [bangles, setBangles] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/bangles")
      .then((res) => res.json())
      .then((data) => setBangles(data))
      .catch((error) => console.error("Error fetching bangles:", error));
  }, []);

  const filteredBangles = bangles.filter(
    (bangle) => selectedType === "All" || bangle.type === selectedType
  );

  return (
    <div className="bangles-section">
      <div className="hero">
        <div className="hero-overlay1_BANGLES"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>BANGLES</h1>
            <p>Grace on your wrist</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Bangle</span>
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
            {filteredBangles.map((bangle) => (
              <div key={bangle._id} className="product-card">
                <div className="product-image">
                  <img src={bangle.imageUrls?.[0]} alt={bangle.name} />
                </div>
                <div className="product-info">
                  <h3>{bangle.name}</h3>
                  <p>{bangle.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanglesSection;