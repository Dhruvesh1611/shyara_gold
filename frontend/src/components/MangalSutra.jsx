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

const MangalsutraSection = () => {
  const [mangalsutras, setMangalsutras] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/mangalsutras")
      .then((res) => res.json())
      .then((data) => setMangalsutras(data))
      .catch((error) => console.error("Error fetching mangalsutras:", error));
  }, []);

  const filteredMangalsutras = mangalsutras.filter(
    (mangalsutra) => selectedType === "All" || mangalsutra.type === selectedType
  );

  return (
    <div className="mangalsutra-section">
      <div className="hero">
        <div className="hero-overlay1_MANGALSUTRA"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>MANGALSUTRA</h1>
            <p>Symbol of love and commitment</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Mangalsutra</span>
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
            {filteredMangalsutras.map((mangalsutra) => (
              <div key={mangalsutra._id} className="product-card">
                <div className="product-image">
                  <img src={mangalsutra.imageUrls?.[0]} alt={mangalsutra.name} />
                </div>
                <div className="product-info">
                  <h3>{mangalsutra.name}</h3>
                  <p>{mangalsutra.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangalsutraSection;