import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [original, setOriginal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setOriginal(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterCategory = async (category) => {
    setActiveCategory(category);

    try {
      setLoading(true);
      if (category === "all") {
        setProducts(original);
      } else {
        const res = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Error filtering category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container page-transition">
      <h1 className="page-title">Discover Products</h1>

      <div className="top-bar">
        <div className="search-container">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="categories-container">
          <h3 className="categories-title">Categories</h3>
          <div className="categories">
            <button
              className={activeCategory === "all" ? "active" : ""}
              onClick={() => filterCategory("all")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => filterCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading products...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3 className="product-title">
                  {product.title.length > 30
                    ? `${product.title.slice(0, 30)}...`
                    : product.title}
                </h3>
                <div className="product-price">
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <Link to={`/products/${product.id}`} className="details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h2>No products found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Home;
