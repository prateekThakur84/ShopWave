import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = cart.find((item) => item.id === product.id);

    if (!itemExists) {
      cart.push({ ...product, quantity });
    } else {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);

    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <Link to="/products" className="back-link">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="detail-container page-transition">
      <Link to="/products" className="back-button">
        ← Back to Products
      </Link>

      <div className="detail-wrapper">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-category">{product.category}</div>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <button className="add-btn" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {added && (
        <div className="cart-popup">
          <div className="cart-popup-content">
            <svg className="check-icon" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
