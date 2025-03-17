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

const PendantsSection = () => {
  const [pendants, setPendants] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4002/pendants")
      .then((res) => res.json())
      .then((data) => setPendants(data))
      .catch((error) => console.error("Error fetching pendants:", error));
  }, []);

  const filteredPendants = pendants.filter(
    (pendant) => selectedType === "All" || pendant.type === selectedType
  );

  return (
    <div className="pendants-section">
      <div className="hero">
        <div className="hero-overlay1_PENDANTS"></div>
        <div className="container2">
          <div className="hero-content">
            <h1>PENDANTS</h1>
            <p>Timeless elegance, perfect for every occasion</p>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/collection">Collection</Link>
          <span>›</span>
          <span className="active">Pendants</span>
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
            {filteredPendants.map((pendant) => (
              <div key={pendant._id} className="product-card">
                <div className="product-image">
                  <img src={pendant.imageUrls?.[0]} alt={pendant.name} />
                </div>
                <div className="product-info">
                  <h3>{pendant.name}</h3>
                  <p>{pendant.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendantsSection;
