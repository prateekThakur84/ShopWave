import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleQuantityChange = (id, change) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-heading">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-price">${item.price.toFixed(2)}</p>

                  <div className="item-quantity">
                    <span>Quantity:</span>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              ✅ Checkout
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="confirmation-popup">✅ Order placed successfully!</div>
      )}
    </div>
  );
};

export default Cart;
