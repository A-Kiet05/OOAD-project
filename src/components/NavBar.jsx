import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
  const navBtnSx = {
    transition:
      "transform 260ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
    transform: "scale(1)",
    "&:hover": {
      opacity: 0.6,
      transform: "scale(1.1)",
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#000",
        boxShadow: "none",
        top: 0,
        height: "74px",
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          py: "12px",
          px: "20px",
          minHeight: 64,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            component={RouterLink}
            to="/"
            disableRipple
            sx={{
              width: 70,
              height: 70,
              padding: 0,
              borderRadius: 1,
              flexShrink: 0,
              transition:
                "opacity 200ms ease, transform 260ms cubic-bezier(.34,1.56,.64,1)",
              "&:hover": { opacity: 0.8, transform: "scale(1.1)" },
            }}
          >
            <img
              src="/images/TOA logo.svg"
              alt="TOA Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </IconButton>

          <Typography
            component={RouterLink}
            to="/"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              ...navBtnSx,
              "&:hover": { opacity: 0.6, transform: "scale(1.05)" },
            }}
          >
            THE ORACLE ALGORITHM
          </Typography>
        </Box>

        {/* Nav links + user */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "25px", alignItems: "center" }}>
          <Button
            component={RouterLink}
            to="/shop"
            color="inherit"
            sx={{ ...navBtnSx, fontSize: "0.94rem", letterSpacing: "0.06em", fontWeight: 400 }}
          >
            SHOPPING
          </Button>
          <Button
            component={RouterLink}
            to="/booking"
            color="inherit"
            sx={{ ...navBtnSx, fontSize: "0.94rem", letterSpacing: "0.06em", fontWeight: 400 }}
          >
            BOOKING
          </Button>
          <Button
            component={RouterLink}
            to="/reading"
            color="inherit"
            sx={{ ...navBtnSx, fontSize: "0.94rem", letterSpacing: "0.06em", fontWeight: 400 }}
          >
            READING
          </Button>

          {/* User dropdown */}
          <Box>
            <IconButton
              sx={{ color: "#fff", ...navBtnSx, paddingRight: "25px" }}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              {user ? (
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    bgcolor: "#E0F778",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {user.fullName ? user.fullName.charAt(0) : "U"}
                </Box>
              ) : (
                <SupervisorAccountIcon />
              )}
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              disableScrollLock
              PaperProps={{
                sx: {
                  bgcolor: "#1E1E1E",
                  color: "#fff",
                  minWidth: 140,
                  borderRadius: 1,
                  p: 0,
                },
              }}
              MenuListProps={{ sx: { p: 0 } }}
            >
              {!user ? (
                [
                  <MenuItem
                    key="login"
                    component={RouterLink}
                    to="/auth"
                    onClick={handleClose}
                    sx={{ "&:hover": { bgcolor: "#E0F778", color: "#000" }, fontWeight: 700 }}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="signup"
                    component={RouterLink}
                    to="/auth"
                    onClick={handleClose}
                    sx={{ "&:hover": { bgcolor: "#E0F778", color: "#000" }, fontWeight: 700 }}
                  >
                    Sign Up
                  </MenuItem>
                ]
              ) : (
                <MenuItem
                  onClick={handleLogout}
                  sx={{ "&:hover": { bgcolor: "#E0F778", color: "#000" }, fontWeight: 700 }}
                >
                  Log Out
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
