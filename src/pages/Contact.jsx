import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: gửi formData lên server hoặc API
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Contact Us
        </h1>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          We'd love to hear from you! Fill out the form below or reach us via
          email or Instagram.
        </p>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: "1 1 200px", textAlign: "center" }}>
            <h3>Email</h3>
            <p>minhtruong2605@gmail.com</p>
          </div>
          <div style={{ flex: "1 1 200px", textAlign: "center" }}>
            <h3>Instagram</h3>
            <p>@mtrg_cmt</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "#FF9500",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E67E00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF9500")}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
