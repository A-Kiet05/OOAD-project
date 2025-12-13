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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/useCart";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { searchProductApi, getAllCategoriesApi } from "../api/productApi";
import { formatVND } from "../utils/currency";
import "../styles/shopbar.css";

const toSlug = (text) => {
  if (!text) return '';
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

export default function ShopBar() {
  const navigate = useNavigate();
  const {
    cartItems,
    getTotalItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartSidebarOpen,    // Lấy từ Context
    closeCartSidebar,     // Lấy từ Context
    openCartSidebar       // Lấy từ Context
  } = useCart();

  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoverMenu, setHoverMenu] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getAllCategoriesApi();
        if (res.status === 200) setCategories(res.categoryDTOs);
      } catch (err) { console.error(err); }
    };
    loadCategories();
  }, []);

  const shopMenuItems = {
    SHOP: ["SHOP ALL", ...categories.map(c => c.name.toUpperCase())],
    COLLECTIONS: ["NEW ARRIVALS", "SALE"],
    MORE: ["CONTACTS"],
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      try {
        const res = await searchProductApi(query);
        if (res.status === 200) setSearchSuggestions(res.productList);
      } catch (err) { setSearchSuggestions([]); }
    } else { setSearchSuggestions([]); }
  };

  const navBtnSx = {
    transition: "transform 260ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
    transform: "scale(1)",
    "&:hover": { opacity: 0.6, transform: "scale(1.05)" },
  };

  return (
    <>
      <Box sx={{ position: "sticky", top: "74px", width: "100%", zIndex: 100 }} onMouseLeave={() => setHoverMenu(null)}>
        <Box sx={{ bgcolor: "#f5f5f5", borderBottom: "1px solid #000", py: 1.5, px: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Menu Left */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
            {Object.keys(shopMenuItems).map((menuName) => (
              <Box key={menuName} onMouseEnter={() => setHoverMenu(menuName)} sx={{ position: "relative" }}>
                <Button sx={{ color: "#000", fontWeight: 500, borderBottom: hoverMenu === menuName ? "2px solid #000" : "none", ...navBtnSx }}>
                  {menuName}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Icons Right */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button onClick={() => setOpenSearch(true)} sx={{ color: "#000", ...navBtnSx }}>SEARCH</Button>
            <IconButton onClick={openCartSidebar} sx={{ color: "#000", ...navBtnSx }}>
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* Dropdown Menu */}
        {hoverMenu && (
          <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, bgcolor: "#f5f5f5", borderBottom: "1px solid #000", p: 3, display: "flex", gap: 8, pl: "40px" }}>
            {shopMenuItems[hoverMenu].map((item, index) => (
              <RouterLink key={index} to={item === "SHOP ALL" ? "/shop/collection/all" : `/shop/collection/${toSlug(item)}`} style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#000", fontWeight: 900, fontSize: "0.95rem" }}>{item}</Button>
              </RouterLink>
            ))}
          </Box>
        )}
      </Box>

      {/* Search Overlay */}
      {openSearch && (
        <Box sx={{ position: "fixed", inset: 0, bgcolor: "rgba(0,0,0,0.7)", zIndex: 300, pt: 10, display: "flex", justifyContent: "center" }} onClick={() => setOpenSearch(false)}>
          <Box onClick={(e) => e.stopPropagation()} sx={{ bgcolor: "#fff", p: 3, width: "90%", maxWidth: "600px", borderRadius: 2 }}>
             <TextField fullWidth placeholder="SEARCH..." value={searchQuery} onChange={handleSearchChange} autoFocus />
             {searchSuggestions.length > 0 && (
               <Paper sx={{ mt: 1, maxHeight: 400, overflow: 'auto' }}>
                 <List>
                   {searchSuggestions.map(p => (
                     <ListItem key={p.productID} onClick={() => {navigate(`/shop/product/${p.productID}`); setOpenSearch(false);}} sx={{ cursor: 'pointer' }}>
                        <img src={p.imageUrl} alt="" style={{ width: 50, marginRight: 15 }} />
                        <ListItemText primary={p.name} secondary={formatVND(p.price)} />
                     </ListItem>
                   ))}
                 </List>
               </Paper>
             )}
          </Box>
        </Box>
      )}

      {/* Cart Drawer - SỬ DỤNG STATE TOÀN CỤC */}
      <Drawer anchor="right" open={isCartSidebarOpen} onClose={closeCartSidebar} sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: "400px" } } }}>
        <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, borderBottom: "1px solid #ddd", pb: 2 }}>
            <h2 style={{ margin: 0 }}>YOUR CART</h2>
            <IconButton onClick={closeCartSidebar}><CloseIcon /></IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {cartItems.length === 0 ? <p style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</p> : cartItems.map((item) => (
              <Box key={item.id} sx={{ display: "flex", gap: 2, mb: 2, pb: 2, borderBottom: "1px solid #eee" }}>
                <img src={item.image} alt="" style={{ width: "80px", height: "100px", objectFit: "cover" }} />
                <Box sx={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>{formatVND(item.price)}</p>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    <Button color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <strong>SUBTOTAL</strong>
              <strong>{formatVND(getTotalPrice())}</strong>
            </Box>
            <Button fullWidth variant="contained" disabled={cartItems.length === 0} sx={{ bgcolor: "#FF9500", py: 1.5 }}>CHECKOUT</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}