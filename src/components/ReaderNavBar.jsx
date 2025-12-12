import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ReaderNavBar() {
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
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
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
        {/* Logo */}
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
        </Box>

        {/* Right section: Reader info + Logout button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingRight: 5 }}>
          {/* Reader name and avatar */}
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#fff",
                  textAlign: "right",
                }}
              >
                {user.fullName}
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#E0F778",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                }}
              >
                {user.fullName ? user.fullName.charAt(0) : "R"}
              </Box>
            </Box>
          )}

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              borderColor: "#E0F778",
              border: "1px solid #E0F778",
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "none",
              px: 2,
              py: 0.7,
              ...navBtnSx,
              "&:hover": {
                bgcolor: "rgba(224, 247, 120, 0.1)",
                borderColor: "#E0F778",
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
