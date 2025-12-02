import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { products } from "../api/data";
import { useCart } from "../context/useCart";
import { formatVND } from "../utils/currency";
import "../styles/shop.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">Product not found</Typography>
        <RouterLink to="/shop" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ mt: 2 }}>
            Back to Shop
          </Button>
        </RouterLink>
      </Box>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Box sx={{ p: 4, minHeight: "80vh", maxWidth: "1200px", margin: "0 auto" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          color: "#000",
          textTransform: "uppercase",
          fontSize: "0.85rem",
          fontWeight: 600,
          mb: 3,
          "&:hover": { bgcolor: "transparent", opacity: 0.7 },
        }}
      >
        BACK
      </Button>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <Box>
          <Box sx={{ mb: 3, overflow: "hidden", borderRadius: "4px" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <Box sx={{ overflow: "hidden", borderRadius: "4px" }}>
            <img
              src={product.image2}
              alt={`${product.name} detail`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
              color: "#666",
              mb: 1,
            }}
          >
            {product.category}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: "0.02em",
              mb: 2,
            }}
          >
            {product.name}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#FF9500",
              mb: 3,
            }}
          >
            {formatVND(product.price)}
          </Typography>

          <Typography
            sx={{ fontSize: "1rem", lineHeight: "1.6", color: "#666", mb: 4 }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                mr: 2,
              }}
            >
              Quantity:
            </Typography>
            <IconButton
              size="small"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              sx={{ border: "1px solid #ddd", borderRadius: "2px" }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
              sx={{ minWidth: "40px", textAlign: "center", fontWeight: 600 }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setQuantity(quantity + 1)}
              sx={{ border: "1px solid #ddd", borderRadius: "2px" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              bgcolor: "#FF9500",
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.04em",
              py: 2,
              mb: 2,
              "&:hover": { bgcolor: "#E67E00" },
            }}
          >
            {added ? "✓ ADDED TO CART" : "ADD TO CART"}
          </Button>

          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                mb: 2,
              }}
            >
              PRODUCT DESCRIPTION
            </Typography>
            <Typography
              sx={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.8" }}
            >
              {product.description}
            </Typography>
          </Box>

          <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #eee" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#999" }}>
              ✓ Free Shipping on Orders Over 500,000 VND
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#999", mt: 1 }}>
              ✓ 30-Day Return Policy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
