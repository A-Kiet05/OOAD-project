import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useCart } from "../context/useCart";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { searchProductApi, getAllCategoriesApi } from "../api/productApi";
import { formatVND } from "../utils/currency";
import "../styles/shopbar.css";

/* ========= SLUG (MATCH ShopCollection.jsx) ========= */
const toSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

/* ========= RESOLVE MENU LINK ========= */
const resolveMenuLink = (menu, item) => {
  if (menu === "SHOP") {
    if (item === "SHOP ALL") return "/shop/collection/all";
    return `/shop/collection/${toSlug(item)}`;
  }

  if (menu === "MORE" && item === "CONTACTS") {
    return "/contact";
  }

  // COLLECTIONS chưa có page → không link
  return null;
};

export default function ShopBar() {
  const navigate = useNavigate();
  const {
    cartItems,
    getTotalItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartSidebarOpen,
    closeCartSidebar,
    openCartSidebar,
  } = useCart();

  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoverMenu, setHoverMenu] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const shopMenuItems = {
    SHOP: ["SHOP ALL", ...categories.map((c) => c.name.toUpperCase())],
    COLLECTIONS: ["NEW ARRIVALS", "SALE"],
    MORE: ["CONTACTS"],
  };

  /* ========= LOAD CATEGORIES ========= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getAllCategoriesApi();
        if (res.status === 200 && res.categoryDTOs) {
          setCategories(res.categoryDTOs);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  // reset checkout form if drawer is closed
  useEffect(() => {
    if (!isCartSidebarOpen) {
      setCheckoutMode(false);
    }
  }, [isCartSidebarOpen]);

  /* ========= SEARCH ========= */
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      try {
        const res = await searchProductApi(query);
        if (res.status === 200) setSearchSuggestions(res.productList);
      } catch {
        setSearchSuggestions([]);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  const navBtnSx = {
    transition:
      "transform 260ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
    "&:hover": { opacity: 0.6, transform: "scale(1.05)" },
  };

  return (
    <>
      {/* ================= SHOP BAR ================= */}
      <Box
        sx={{ position: "sticky", top: "74px", width: "100%", zIndex: 100 }}
        onMouseLeave={() => setHoverMenu(null)}
      >
        <Box
          sx={{
            bgcolor: "#f5f5f5",
            borderBottom: "1px solid #000",
            py: 1.5,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT MENU */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
            {Object.keys(shopMenuItems).map((menuName) => (
              <Box
                key={menuName}
                onMouseEnter={() => setHoverMenu(menuName)}
              >
                <Button
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    borderBottom:
                      hoverMenu === menuName ? "2px solid #000" : "none",
                    ...navBtnSx,
                  }}
                >
                  {menuName}
                </Button>
              </Box>
            ))}
          </Box>

          {/* RIGHT ICONS */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              onClick={() => setOpenSearch(true)}
              sx={{ color: "#000", ...navBtnSx }}
            >
              SEARCH
            </Button>

            <IconButton onClick={openCartSidebar} sx={{ color: "#000" }}>
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* ================= DROPDOWN ================= */}
        {hoverMenu && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              bgcolor: "#f5f5f5",
              borderBottom: "1px solid #000",
              p: 3,
              display: "flex",
              gap: 8,
              pl: "40px",
            }}
          >
            {shopMenuItems[hoverMenu].map((item, index) => {
              const link = resolveMenuLink(hoverMenu, item);

              return link ? (
                <RouterLink
                  key={index}
                  to={link}
                  style={{ textDecoration: "none" }}
                  onClick={() => setHoverMenu(null)}
                >
                  <Button
                    sx={{
                      color: "#000",
                      fontWeight: 900,
                      fontSize: "0.95rem",
                      ...navBtnSx,
                    }}
                  >
                    {item}
                  </Button>
                </RouterLink>
              ) : (
                <Button
                  key={index}
                  disabled
                  sx={{
                    color: "#999",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        )}
      </Box>

      {/* ================= SEARCH OVERLAY ================= */}
      {openSearch && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.7)",
            zIndex: 300,
            pt: 10,
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => setOpenSearch(false)}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              bgcolor: "#fff",
              p: 3,
              width: "90%",
              maxWidth: "600px",
              borderRadius: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />

            {searchSuggestions.length > 0 && (
              <Paper sx={{ mt: 1, maxHeight: 400, overflow: "auto" }}>
                <List>
                  {searchSuggestions.map((p) => (
                    <ListItem
                      key={p.productID}
                      onClick={() => {
                        navigate(`/shop/product/${p.productID}`);
                        setOpenSearch(false);
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <img
                        src={p.imageUrl}
                        alt=""
                        style={{ width: 50, marginRight: 15 }}
                      />
                      <ListItemText
                        primary={p.name}
                        secondary={formatVND(p.price)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Box>
      )}

      {/* ================= CART DRAWER ================= */}
      <Drawer
        anchor="right"
        open={isCartSidebarOpen}
        onClose={closeCartSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "400px" },
          },
        }}
      >
        <Box
          sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
        >
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
            <IconButton onClick={closeCartSidebar}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {cartItems.length === 0 ? (
              <p style={{ textAlign: "center" }}>YOUR CART IS EMPTY</p>
            ) : (
              cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "80px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <h4>{item.name}</h4>
                    <p>{formatVND(item.price)}</p>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <strong>SUBTOTAL</strong>
              <strong>{formatVND(getTotalPrice())}</strong>
            </Box>

            {!checkoutMode ? (
              <Button
                fullWidth
                variant="contained"
                disabled={cartItems.length === 0}
                sx={{ bgcolor: "#FF9500", py: 1.5 }}
                onClick={() => setCheckoutMode(true)}
              >
                CHECKOUT
              </Button>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl component="fieldset">
                  <InputLabel shrink sx={{ mb: 0.5 }}>Payment method</InputLabel>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery (COD)" />
                    <FormControlLabel value="ZaloPay" control={<Radio />} label="ZaloPay" />
                    <FormControlLabel value="Momo" control={<Radio />} label="Momo" />
                    <FormControlLabel value="Bank" control={<Radio />} label="Bank transfer" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="shipping-method-label">Shipping method</InputLabel>
                  <Select
                    labelId="shipping-method-label"
                    value={shippingMethod}
                    label="Shipping method"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  >
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="express">Express</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Shipping address"
                  multiline
                  minRows={2}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <TextField label="Phone number" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" fullWidth onClick={() => setCheckoutMode(false)}>
                    Back to cart
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: "#FF9500" }}
                    onClick={() => {
                      if (!address || !phone) {
                        alert("Please provide shipping address and phone number.");
                        return;
                      }
                      // placeholder: place order
                      alert(`Order placed. Payment: ${paymentMethod}, Shipping: ${shippingMethod}`);
                      setCheckoutMode(false);
                      closeCartSidebar();
                    }}
                  >
                    Place order
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
