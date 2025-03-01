import React, { useState } from "react";
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

const RING_PRODUCTS = [
  {
    id: 1,
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw5f2c5c45/images/hi-res/510122FAAAA00.jpg?sw=640&sh=640",
    name: "Classic Yellow Gold Ring",
    type: "Yellow Gold",
    description: "A timeless 22K yellow gold ring with a smooth finish, perfect for daily wear.",
  },
  {
    id: 2,
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw330d185d/images/hi-res/50E4SRFANA737_2.jpg?sw=480&sh=480",
    name: "Yellow Gold Diamond Ring",
    type: "Yellow Gold with diamond",
    description: "A stunning 18K yellow gold ring adorned with a sparkling diamond centerpiece.",
  },
  {
    id: 3,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw40c286ff/images/hi-res/50E4SRFBA2137_2.jpg?sw=480&sh=480',
    name: 'Elegant Rose Gold Ring',
    type: 'Rose Gold',
    description: 'An elegantly crafted 18K rose gold ring with a smooth and polished design.'
  },
  {
    id: 4,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw810d8c46/images/hi-res/50E4SRFBC2137_2.jpg?sw=480&sh=480',
    name: 'Rose Gold Diamond Band',
    type: 'Rose Gold with diamond',
    description: 'A stylish 14K rose gold band embedded with delicate diamonds for a luxurious look.'
  },
  {
    id: 5,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwd824e07a/images/hi-res/50E4SRFACA137_2.jpg?sw=480&sh=480',
    name: 'Sleek Platinum Ring',
    type: 'Platinum',
    description: 'A sleek and modern platinum ring, perfect for contemporary jewelry lovers.'
  },
  {
    id: 6,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7657c52b/images/hi-res/50E4SRFAHA437_2.jpg?sw=480&sh=480',
    name: 'Platinum Diamond Ring',
    type: 'Platinum',
    description: 'An exquisite platinum ring with a radiant diamond centerpiece, symbolizing elegance.'
  },
  {
    id: 7,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw3ae6568d/images/hi-res/50E4SRFAJA237_2.jpg?sw=480&sh=480',
    name: 'Classic Silver Band',
    type: 'Yellow Gold with diamond',
    description: 'A simple yet elegant silver band with a refined design for everyday wear.'
  },
  {
    id: 8,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcb78fb08/images/hi-res/50D4B2FOMAA32_2.jpg?sw=480&sh=480',
    name: 'Silver Infinity Ring',
    type: 'Yellow Gold with diamond',
    description: 'A sophisticated silver ring featuring an infinity design, symbolizing endless love.'
  },
  {
    id: 9,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwb840330b/images/hi-res/50D4FFFCDAA02_2.jpg?sw=480&sh=480',
    name: 'Ornate Yellow Gold Ring',
    type: 'Yellow Gold',
    description: 'An ornate 22K yellow gold ring with intricate detailing, ideal for festive occasions.'
  },
  {
    id: 10,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d5841da/images/hi-res/743318FIVAA00_2.jpg',
    name: 'Vintage Yellow Gold Diamond Ring',
    type: 'Yellow Gold with diamond',
    description: 'A vintage-inspired yellow gold ring with an exquisite diamond setting.'
  },
  {
    id: 11,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw57380761/images/hi-res/74D3D1FPUAA02_2.jpg?sw=480&sh=480',
    name: 'Modern Rose Gold Diamond Ring',
    type: 'Rose Gold with diamond',
    description: 'A modern 18K rose gold ring accented with shimmering diamonds for a luxurious look.'
  },
  {
    id: 12,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwaa068779/images/hi-res/741188FMWAA00_2.jpg?sw=480&sh=480',
    name: 'Sleek Silver Ring',
    type: 'Silver',
    description: 'A sleek and minimalist silver ring for a modern and refined style.'
  },
  {
    id: 13,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw6044c8cb/images/hi-res/741188FCPAA00_2.jpg?sw=480&sh=480',
    name: 'Minimalist Silver Band',
    type: 'Silver',
    description: 'A classic silver band with a smooth finish, perfect for everyday wear.'
  },
  {
    id: 14,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwa4268d69/images/hi-res/741188FVCAA04_2.jpg?sw=480&sh=480',
    name: 'Elegant Silver Band',
    type: 'Silver',
    description: 'A gracefully designed silver ring with a modern touch, ideal for everyday wear.'
  },
  {
    id: 15,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw1da5b876/images/hi-res/741188FVHAA04_2.jpg?sw=480&sh=480',
    name: 'Minimalist Silver Ring',
    type: 'Silver',
    description: 'A sleek and stylish silver ring, perfect for an understated yet elegant look.'
  },
  {
    id: 16,
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw2bc53b9e/images/hi-res/741005FLFAA02.jpg?sw=640&sh=640',
    name: 'Diamond Accent Platinum Ring',
    type: 'Platinum',
    description: 'A sophisticated platinum ring with diamond accents, radiating timeless elegance.'
  }
];

function RingsSection() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredRings = RING_PRODUCTS.filter(
    (ring) => selectedType === "All" || ring.type === selectedType
  );

  return (
    <div className="rings-section">
      <div className="hero">
        <div className="hero-overlay1_BANGLES"></div>
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
              <div key={ring.id} className="product-card">
                <div className="product-image">
                  <img src={ring.image} alt={ring.name} />
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
}

export default RingsSection;
