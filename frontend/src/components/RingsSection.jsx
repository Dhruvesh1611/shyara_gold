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
  "silver",
];

const RingsSection = () => {
  const [rings, setRings] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/rings")
      .then((res) => res.json())
      .then((data) => setRings(data))
      .catch((error) => console.error("Error fetching rings:", error));
  }, []);

  const filteredRings = rings.filter(
    (ring) => selectedType === "All" || ring.type === selectedType
  );

  return (
    <div className="rings-section">
      <div className="hero">
        <div className="hero-overlay1_RINGS"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>RINGS</h1>
            <p>To own the moment</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Ring</span>
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
            {filteredRings.map((ring) => (
              <div key={ring._id} className="product-card">
                <div className="product-image">
                <img src={ring.imageUrls?.[0]} alt={ring.name} />
                </div>
                <div className="product-info">
                  <h3>{ring.name}</h3>
                  <p>{ring.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingsSection;