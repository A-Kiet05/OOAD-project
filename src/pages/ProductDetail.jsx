// src/components/ProductDetail.jsx

import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProductByIdApi } from '../api/productApi'; // Lấy dữ liệu từ API
import { useCart } from "../context/useCart"; 
import { formatVND } from "../utils/currency";
import "../styles/shop.css"; // Giữ lại nếu file này cần thiết

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Lấy addToCart từ Context (giờ đây sẽ tự động mở Sidebar)
  const { addToCart } = useCart(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false); // State để hiển thị "✓ ADDED TO CART"

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProductByIdApi(id);
        if (res.status === 200 && res.product) {
            setProduct(res.product); 
            setQuantity(1); 
        } else {
            setError(res.message || "Failed to load product details.");
        }
      } catch (err) { 
        console.error("Error fetching product details:", err); 
        setError("Network error or product not found.");
      }
      finally { 
        setLoading(false); 
      }
    };
    fetchProduct();
  }, [id]);

  // Logic Thêm vào Giỏ hàng
  const handleAddToCart = () => {
    if (quantity <= 0 || product.stockQuantity <= 0) return;
    if (quantity > product.stockQuantity) {
        alert(`Chỉ còn ${product.stockQuantity} sản phẩm trong kho.`);
        return;
    }
    
    // Tạo đối tượng item cho giỏ hàng
    const cartItem = {
      id: product.productID, 
      name: product.name,
      price: product.price,
      image: product.imageUrl 
    };
    
    // Thêm sản phẩm vào giỏ hàng (và hàm này sẽ tự động mở Sidebar)
    for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
    }
    
    // Bật trạng thái "ADDED" trong 2 giây (theo logic cũ của bạn)
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Xử lý Loading/Error
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  if (error || !product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Alert severity="error">{error || "Product not found"}</Alert>
        <RouterLink to="/shop/collection/all" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ mt: 2, bgcolor: "#FF9500" }}>
            Back to Shop
          </Button>
        </RouterLink>
      </Box>
    );
  }

  // Khôi phục phần Render UI chi tiết
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

      <Box sx={{ display: "grid", gridTemplateColumns: {xs: "1fr", md: "1fr 1fr"}, gap: 4 }}>
        <Box>
          <Box sx={{ mb: 3, overflow: "hidden", borderRadius: "4px" }}>
            <img
              src={product.imageUrl} 
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
          {product.backgroundUrl && (
            <Box sx={{ overflow: "hidden", borderRadius: "4px" }}>
              <img
                src={product.backgroundUrl} 
                alt={`${product.name} detail`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          )}
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
            {product.categoryDTO?.name || "Category"}
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
            sx={{ fontSize: "1rem", lineHeight: "1.6", color: "#666", mb: 4, whiteSpace: 'pre-wrap' }}
          >
            {product.description}
          </Typography>

          {/* Quantity Controls */}
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
              disabled={product.stockQuantity <= 0 || quantity === 1}
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
              onClick={() => setQuantity(Math.min(quantity + 1, product.stockQuantity))}
              disabled={product.stockQuantity <= 0 || quantity >= product.stockQuantity}
              sx={{ border: "1px solid #ddd", borderRadius: "2px" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
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
            {product.stockQuantity > 0 ? (added ? "✓ ADDED TO CART" : "ADD TO CART") : "OUT OF STOCK"}
          </Button>
          
          <Typography variant="body2" sx={{ mt: 1, color: product.stockQuantity < 5 && product.stockQuantity > 0 ? 'red' : 'gray' }}>
            Storage: {product.stockQuantity} products
          </Typography>
          
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