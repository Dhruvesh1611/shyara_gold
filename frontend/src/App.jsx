import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SearchProvider } from "./components/SearchContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home_page from "./components/Home_page";
import UsersCollection from "./components/Users_Collection";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Collection from "./components/Collection";
import Spinner from "./components/Spinner";
import RingsSection from "./components/RingsSection";
import Breadcrumb from "./components/Breadcrumbs";
import BanglesPage from "./components/BanglesPage";
import Navbar from "./components/Navbar";
import UserPanel from "./components/UserPanel";
import AdminPanel from "./components/AdminPanel";
import OwnerPanel from "./components/OwnerPanel";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard"
import OwnerDashboard from "./components/OwnerDashboard"
import "./App.css";
import Register from "./components/Register";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const shouldShowNavbar = !["/login", "/register"].includes(location.pathname);
  return (
    <>
      <ScrollToTop />

      {/* ✅ Hide Navbar on Login Page */}
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* ✅ Correct usage */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home_page />} />
        <Route path="/users-collection" element={<UsersCollection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/collection" element={<><Breadcrumb /><Collection /></>} />
        <Route path="/collection/ring" element={<><Breadcrumb /><RingsSection /></>} />
        <Route path="/collection/bangles" element={<BanglesPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user" element={<ProtectedRoute component={UserPanel} allowedRoles={["user", "admin", "owner"]} />} />
        <Route path="/owner" element={<ProtectedRoute component={OwnerPanel} allowedRoles={["owner"]} />} />
      </Routes>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <SearchProvider>
      <Router>
        {loading ? <Spinner /> : <AppContent />}
      </Router>
    </SearchProvider>
  );
}

export default App;
