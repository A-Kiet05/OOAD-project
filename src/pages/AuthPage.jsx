import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import LightRays from "../components/LightRays.jsx";

export default function AuthPage() {
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Signup
  const handleTabChange = (e, newValue) => setTab(newValue);

  const textFieldStyle = {
    "& .MuiOutlinedInput-input": {
      color: "#E0F778", // màu chữ
      backgroundColor: "#1E1E1E", // background input
    },
    "& .MuiInputLabel-root": {
      color: "#E0F778", // label mặc định
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#E0F778", // label khi focus
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#1E1E1E", // background tổng thể
      "& fieldset": { borderColor: "#E0F778" }, // viền
      "&:hover fieldset": { borderColor: "#E0F778" },
      "&.Mui-focused fieldset": { borderColor: "#E0F778" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#1f1e1eff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
       <LightRays
    raysOrigin="top-center"
    raysColor="#E0F778"
    raysSpeed={1.5}
    lightSpread={2}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
      </Box>

      <Paper
        elevation={12}
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            backgroundColor: "#474747ff",
            "& .MuiTabs-indicator": { backgroundColor: "#E0F778" },
            "& .MuiTab-root": {
              color: "#DAD0E9",
              fontWeight: 600,
              textTransform: "none",
              "& .Mui-selected": { color: "#E0F778" },
              "&.Mui-focusVisible": { color: "#E0F778" },
            },
            "& .Mui-selected": { color: "#E0F778" },
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box
          sx={{
            p: 4,
            bgcolor: "#302f2fff",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {tab === 0 ? (
            <>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#E0F778",
                  color: "#000000",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": { bgcolor: "#D6E05D" },
                }}
              >
                Login
              </Button>
              <Typography
                sx={{
                  color: "#DAD0E9",
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              >
                Forgot your password?
              </Typography>
            </>
          ) : (
            <>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#E0F778",
                  color: "#000000",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": { bgcolor: "#D6E05D" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
