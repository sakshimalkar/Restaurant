import { useState, useEffect } from "react";
import { ShoppingCart, Utensils, Phone, MapPin, Clock, X } from "lucide-react";
import heroImg from "./assets/restobanner.png";

import pizzaImg from "./assets/pizza.jpg";
import paneerImg from "./assets/paneer.jpg";
import frenchImg from "./assets/french.jpg";
import noodleImg from "./assets/noodle.jpg";
import dosaImg from "./assets/dosa.webp";

function App() {
  const menuItems = [
    {
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      discount: 10,
      quantity: 20,
      img: pizzaImg,
    },
    {
      name: "Veg Burger",
      category: "Burger",
      price: 149,
      discount: 5,
      quantity: 30,
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      name: "Pasta Alfredo",
      category: "Pasta",
      price: 249,
      discount: 15,
      quantity: 15,
      img: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    },
    {
      name: "Paneer Tikka",
      category: "Starters",
      price: 199,
      discount: 8,
      quantity: 25,
      img: paneerImg,
    },
    {
      name: "French Fries",
      category: "Snacks",
      price: 99,
      discount: 0,
      quantity: 40,
      img: frenchImg,
    },
    {
      name: "Cheese Sandwich",
      category: "Sandwich",
      price: 129,
      discount: 5,
      quantity: 18,
      img: "https://images.unsplash.com/photo-1553909489-cd47e0907980",
    },
    {
      name: "Chaines Noodles",
      category: "Hakka Noodles",
      price: 120,
      discount: 5,
      quantity: 20,
      img: noodleImg,
    },
    {
      name: "South Dosa",
      category: "Cheese Dosa",
      price: 80,
      discount: 5,
      quantity: 12,
      img: dosaImg,
    },
  ];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ FIX: prevent duplicate items
  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem.name === item.name);
    if (!exists) {
      setCart([...cart, item]);
    }
  };

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 position-relative">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
          <Utensils /> Foodies Hub
        </a>

        <div className="ms-auto d-flex align-items-center gap-4 position-relative">
          <a className="nav-link" href="#menu">Menu</a>
          <a className="nav-link" href="#reserve">Reservation</a>
          <a className="nav-link" href="#contact">Contact</a>

          <button
            className="btn btn-outline-dark d-flex align-items-center gap-1"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart size={18} /> {cart.length}
          </button>

          {showCart && (
            <div
              className="position-absolute bg-white shadow rounded p-3"
              style={{ top: "45px", right: "0", width: "280px", zIndex: 1000 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Cart Items</strong>
                <X size={18} style={{ cursor: "pointer" }} onClick={() => setShowCart(false)} />
              </div>

              {cart.length === 0 ? (
                <p className="text-muted mb-0">Cart is empty</p>
              ) : (
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <small className="fw-bold">{item.name}</small><br />
                        <small className="text-muted">₹{item.price}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "380px",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold display-5">Delicious Food, Delivered Fresh</h1>
          <p>Order online or reserve your table now</p>
          <button className="btn btn-danger px-4 py-2">Order Now</button>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="container my-5">
        <h2 className="fw-bold mb-4">Our Menu</h2>

        <div className="row g-4">
          {menuItems.map((item) => (
            <div className="col-md-4 col-lg-3" key={item.name}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="text-muted mb-1">{item.category}</p>
                  <p className="fw-bold mb-1">₹{item.price}</p>

                  {item.discount > 0 && (
                    <small className="text-success">{item.discount}% OFF</small>
                  )}

                  <small className="text-muted mb-2">
                    Available: {item.quantity}
                  </small>

                  <button
                    className="btn btn-dark w-100 mt-auto"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation */}
      <section id="reserve" className="container my-5">
        <h2
          className="fw-bold mb-4 text-center"
          style={{ fontFamily: "Georgia, serif" }}   // ✅ ONLY FONT CHANGED
        >
          Reserve a Table
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <input className="form-control mb-3" placeholder="Your Name" />
            <input type="date" className="form-control mb-3" />
            <input type="number" className="form-control mb-3" placeholder="Number of Guests" />
            <button className="btn btn-success w-100">Confirm Reservation</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-light py-4">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-3"><Phone /> +91 9022211896</div>
            <div className="col-md-4 mb-3"><MapPin /> Pune, Swargate, India</div>
            <div className="col-md-4 mb-3"><Clock /> 08:00 AM – 12:00 PM</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;