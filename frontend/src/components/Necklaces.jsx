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

const NecklaceSection = () => {
  const [necklaces, setNecklaces] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/necklaces")
      .then((res) => res.json())
      .then((data) => setNecklaces(data))
      .catch((error) => console.error("Error fetching necklaces:", error));
  }, []);

  const filteredNecklaces = necklaces.filter(
    (necklace) => selectedType === "All" || necklace.type === selectedType
  );

  return (
    <div className="necklace-section">
      <div className="hero">
        <div className="hero-overlay1_NECKLACE"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>NECKLACES</h1>
            <p>Elegance that complements your beauty</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Necklaces</span>
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
            {filteredNecklaces.map((necklace) => (
              <div key={necklace._id} className="product-card">
                <div className="product-image">
                  <img src={necklace.imageUrls?.[0]} alt={necklace.name} />
                </div>
                <div className="product-info">
                  <h3>{necklace.name}</h3>
                  <p>{necklace.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NecklaceSection;
