import React, { useState, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./components/SearchContext";
import Home_page from "./components/Home_page";
import UsersCollection from "./components/Users_Collection";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Collection from "./components/Collection";
import Spinner from "./components/Spinner";
import RingsSection from "./components/RingsSection";
import Breadcrumb from "./components/Breadcrumbs";
import BanglesSection from "./components/BanglesSection";
import Chains from "./components/Chains";
import MangalSutra from "./components/MangalSutra";
import EarRings from "./components/EarRings";
import Bracelates from "./components/Bracelates";
import Pendants from "./components/Pendants";
import Necklaces from "./components/Necklaces" 
import Navbar from "./components/Navbar";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures page scrolls to top on route change
  }, [pathname]);

  return null; // This component doesn't render anything
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated loading time
  }, []);

  return (
    <SearchProvider>
      <Router>
        {loading ? ( 
          <Spinner /> 
        ) : ( 
          <div style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}>
            <ScrollToTop /> {/* ✅ Ensures scrolling to top on navigation */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home_page />} />
              <Route path="/users-collection" element={<UsersCollection />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/collection" element={<><Breadcrumb /><Collection /></>} />
              <Route path="/collection/ring" element={<><Breadcrumb /><RingsSection /></>} />
              <Route path="/collection/bangles" element={<><Breadcrumb /><BanglesSection/></>} />
              <Route path="/collection/Necklaces" element={<><Breadcrumb /><Necklaces/></>} />
              <Route path="/collection/Chains" element={<><Breadcrumb /><Chains/></>} />
              <Route path="/collection/MangalSutra" element={<><Breadcrumb /><MangalSutra/></>} />
              <Route path="/collection/EarRings" element={<><Breadcrumb /><EarRings/></>} />
              <Route path="/collection/bracelets" element={<><Breadcrumb /><Bracelates/></>} />
              <Route path="/collection/Pendants" element={<><Breadcrumb /><Pendants/></>} />
            </Routes>
          </div>
        )}
      </Router>
    </SearchProvider>
  );
}

export default App;
