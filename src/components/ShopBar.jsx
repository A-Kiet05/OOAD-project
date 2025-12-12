import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/useCart";
import { Link as RouterLink } from "react-router-dom";
import { products } from "../api/data";
import { formatVND } from "../utils/currency";
import "../styles/shopbar.css";

export default function ShopBar() {
  const {
    cartItems,
    getTotalItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
  } = useCart();
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoverMenu, setHoverMenu] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const shopMenuItems = {
    SHOP: ["SHOP ALL", "TAROT", "LENORMAND", "ACCESSORIES"],
    COLLECTIONS: ["SHOP ALL", "NEW ARRIVALS", "SALE"],
    MORE: ["CONTACTS"],
  };

  const getRouteFromMenuItem = (item) => {
    const routeMap = {
      "SHOP ALL": "/shop/all",
      TAROT: "/shop/tarot",
      LENORMAND: "/shop/lenormand",
      ACCESSORIES: "/shop/accessories",
      "NEW ARRIVALS": "/shop/new-arrivals",
      SALE: "/shop/sale",
      CONTACTS: "/contact",
    };
    return routeMap[item] || `/shop/${item.toLowerCase().replace(" ", "-")}`;
  };

  const handleMenuHover = (menu) => {
    setHoverMenu(menu);
  };

  const handleMenuLeave = () => {
    setHoverMenu(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setSearchSuggestions([]);
    setOpenSearch(false);
  };

  const handleSuggestionClick = () => {
    setSearchQuery("");
    setSearchSuggestions([]);
    setOpenSearch(false);
    // You could navigate to product detail or add to cart here
  };

  const navBtnSx = {
    transition:
      "transform 260ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
    transform: "scale(1)",
    "&:hover": {
      opacity: 0.6,
      transform: "scale(1.05)",
    },
  };

  return (
    <>
      {/* Shop Bar Container - Always positioned relative for absolute dropdown */}
      <Box
        sx={{
          position: "sticky",
          top: "74px",
          width: "100%",
          zIndex: 100,
        }}
        onMouseLeave={handleMenuLeave}
      >
        {/* Shop Bar */}
        <Box
          sx={{
            bgcolor: "#f5f5f5",
            borderBottom: "1px solid #000",
            py: 1.5,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
        {/* Left Section - Menu Buttons */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: { sm: 2, md: 4 } }}>
            {Object.keys(shopMenuItems).map((menuName) => (
              <Box
                key={menuName}
                onMouseEnter={() => handleMenuHover(menuName)}
                sx={{ position: "relative" }}
              >
                <Button
                  sx={{
                    color: "#000",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    ...navBtnSx,
                    pb: 1,
                    borderBottom:
                      hoverMenu === menuName ? "2px solid #000" : "none",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {menuName}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Right Section - Search and Cart */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              alignItems: "center",
              paddingRight: { xs: "12px", sm: "20px" },
            }}
          >
            <Button
              onClick={() => setOpenSearch(true)}
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#000",
                textTransform: "uppercase",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                ...navBtnSx,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              SEARCH
            </Button>

            <IconButton
              onClick={() => setOpenSearch(true)}
              sx={{
                display: { xs: "block", sm: "none" },
                color: "#000",
              }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              onClick={() => setOpenCart(true)}
              sx={{
                color: "#000",
                ...navBtnSx,
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* Full-width dropdown that appears under the bar */}
        {hoverMenu && (
          <Box
            className="dropdown-menu"
            onMouseEnter={() => handleMenuHover(hoverMenu)}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              bgcolor: "#f5f5f5",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 200,
              pt: 3,
              pb: 3,
              display: "flex",
              justifyContent: "flex-start",
              gap: 8,
              paddingLeft: "40px",
            }}
          >
            {shopMenuItems[hoverMenu].map((item, index) => (
              <RouterLink
                key={index}
                to={getRouteFromMenuItem(item)}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    color: "#000",
                    textTransform: "uppercase",
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    ...navBtnSx,
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {item}
                </Button>
              </RouterLink>
            ))}
          </Box>
        )}
      </Box>

      {/* Search Overlay */}
      {openSearch && (
        <Box
          className="search-overlay"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 10,
          }}
          onClick={() => {
            setOpenSearch(false);
            setSearchQuery("");
            setSearchSuggestions([]);
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              bgcolor: "#fff",
              borderRadius: "8px",
              p: 3,
              width: "90%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <h3 style={{ margin: 0 }}>SEARCH PRODUCTS</h3>
              <IconButton
                onClick={() => {
                  setOpenSearch(false);
                  setSearchQuery("");
                  setSearchSuggestions([]);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="TYPE PRODUCT NAME..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                  mb: 2,
                }}
              />
            </form>

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  SUGGESTIONS ({searchSuggestions.length})
                </h4>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {searchSuggestions.map((product) => (
                    <RouterLink
                      key={product.id}
                      to={`/shop/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        onClick={() => handleSuggestionClick()}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 2,
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                          },
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "60px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <h4
                            style={{ margin: "0 0 4px 0", fontSize: "0.95rem" }}
                          >
                            {product.name}
                          </h4>
                          <p
                            style={{
                              margin: "0 0 4px 0",
                              fontSize: "0.85rem",
                              color: "#666",
                            }}
                          >
                            {product.category.toUpperCase()}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.9rem",
                              color: "#FF9500",
                              fontWeight: 600,
                            }}
                          >
                            {formatVND(product.price)}
                          </p>
                        </Box>
                      </Box>
                    </RouterLink>
                  ))}
                </Box>
              </Box>
            )}

            {searchQuery.trim().length > 0 &&
              searchSuggestions.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4, color: "#999" }}>
                  <p>NO PRODUCTS FOUND FOR "{searchQuery}"</p>
                </Box>
              )}
          </Box>
        </Box>
      )}

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={openCart}
        onClose={() => setOpenCart(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "400px" },
            boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              borderBottom: "1px solid #ddd",
              pb: 2,
            }}
          >
            <h2 style={{ margin: 0 }}>YOUR CART</h2>
            <Badge badgeContent={getTotalItems()} color="error">
              <ShoppingCartIcon />
            </Badge>
            <IconButton onClick={() => setOpenCart(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
            {cartItems.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <p>YOUR CART IS EMPTY</p>
                <p>ADD SOME ITEMS TO THE CART.</p>
              </Box>
            ) : (
              cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 8px 0" }}>{item.name}</h4>
                      <p style={{ margin: "0 0 8px 0" }}>{formatVND(item.price)}</p>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Footer */}
          <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
                <strong>SUBTOTAL</strong>
                <strong>{formatVND(getTotalPrice())}</strong>
            </Box>
            <Button
              fullWidth
              variant="contained"
              disabled={cartItems.length === 0}
              sx={{
                bgcolor: cartItems.length === 0 ? "#ccc" : "#FF9500",
                color: "#fff",
                textTransform: "uppercase",
                py: 1.5,
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
