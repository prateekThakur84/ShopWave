import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen = true, isMobile = false, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside
        className={`sidebar ${isMobile ? "mobile" : ""} ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2 className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopWave</span>
          </h2>
        </div>

        <nav className="sidebar-nav">
          <Link
            className={`sidebar-link ${
              location.pathname === "/products" ? "active" : ""
            }`}
            to="/products"
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">🏠</span>
            <span className="sidebar-label">Home</span>
          </Link>

          <Link
            className={`sidebar-link ${
              location.pathname === "/cart" ? "active" : ""
            }`}
            to="/cart"
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">🛒</span>
            <span className="sidebar-label">Cart</span>
          </Link>

          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-label">Logout</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 ShopWave</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
