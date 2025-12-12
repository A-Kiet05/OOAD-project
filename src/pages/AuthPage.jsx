import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Box, Button, TextField, Typography, Paper, Tabs, Tab } from "@mui/material";
import LightRays from "../components/LightRays.jsx";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user } = useAuth();

  const [tab, setTab] = useState(0); // 0 = Login, 1 = Signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Check location.state to set tab
  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setTab(location.state.tab);
    }
  }, [location.state]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "reader") {
        navigate("/reader-schedule");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const textFieldStyle = {
    "& .MuiOutlinedInput-input": { color: "#E0F778", backgroundColor: "#1E1E1E" },
    "& .MuiInputLabel-root": { color: "#E0F778" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#E0F778" },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#1E1E1E",
      "& fieldset": { borderColor: "#E0F778" },
      "&:hover fieldset": { borderColor: "#E0F778" },
      "&.Mui-focused fieldset": { borderColor: "#E0F778" },
    },
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const u = await login(loginEmail, loginPassword);
      // Redirect handled by useEffect watching user state
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const u = await signup(signupName, signupEmail, signupPassword);
      // Redirect handled by useEffect watching user state
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#1f1e1eff", position: "relative", overflow: "hidden" }}>
      {/* Background Rays */}
      <Box sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
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
        />
      </Box>

      {/* Card */}
      <Paper elevation={12} sx={{ maxWidth: 400, width: "100%", borderRadius: 3, overflow: "hidden", zIndex: 1 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="fullWidth"
          sx={{
            backgroundColor: "#474747ff",
            "& .MuiTabs-indicator": { backgroundColor: "#E0F778" },
            "& .MuiTab-root": {
              color: "#DAD0E9",
              fontWeight: 600,
              textTransform: "none",
              "&.Mui-selected": { color: "#E0F778" },
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box sx={{ p: 4, bgcolor: "#302f2fff", display: "flex", flexDirection: "column", gap: 3 }}>
          {tab === 0 && (
            <>
              <TextField label="Email" fullWidth sx={textFieldStyle} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              <TextField label="Password" type="password" fullWidth sx={textFieldStyle} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />

              {error && <Typography sx={{ color: "#ff8080", textAlign: "center", fontSize: "0.9rem" }}>{error}</Typography>}

              <Button variant="contained" disabled={loading} sx={{ bgcolor: "#E0F778", color: "#000", fontWeight: 700, py: 1.5, "&:hover": { bgcolor: "#D6E05D" } }} onClick={handleLogin}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <Typography sx={{ color: "#DAD0E9", fontSize: "0.85rem", textAlign: "center" }}>Forgot your password?</Typography>
            </>
          )}

          {tab === 1 && (
            <>
              <TextField label="Full Name" fullWidth sx={textFieldStyle} value={signupName} onChange={(e) => setSignupName(e.target.value)} />
              <TextField label="Email" fullWidth sx={textFieldStyle} value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
              <TextField label="Password" type="password" fullWidth sx={textFieldStyle} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />

              {error && <Typography sx={{ color: "#ff8080", textAlign: "center", fontSize: "0.9rem" }}>{error}</Typography>}

              <Button variant="contained" disabled={loading} sx={{ bgcolor: "#E0F778", color: "#000", fontWeight: 700, py: 1.5, "&:hover": { bgcolor: "#D6E05D" } }} onClick={handleSignup}>
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
