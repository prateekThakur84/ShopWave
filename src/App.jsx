import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Sidebar from "./components/Sidebar";
import "./app.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false); // Close sidebar when screen size increases
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app page-transition">
      {isLoggedIn && (
        <Sidebar
          isOpen={isMobileView ? sidebarOpen : true}
          isMobile={isMobileView}
          toggleSidebar={toggleSidebar}
        />
      )}
      <main
        className="main-content"
        style={{
          marginLeft: isLoggedIn && !isMobileView ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        {isLoggedIn && isMobileView && (
          <button
            className="menu-toggle"
            onClick={toggleSidebar}
            style={{
              position: "fixed",
              top: "10px",
              left: sidebarOpen ? "260px" : "10px",
              zIndex: 1000,
              transition: "left 0.3s ease",
              background: "var(--surface-dark)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {sidebarOpen ? "×" : "☰"}
          </button>
        )}
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
            />
            <Route
              path="/products"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/products/:id"
              element={isLoggedIn ? <ProductDetail /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
