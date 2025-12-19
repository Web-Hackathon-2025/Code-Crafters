import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:3000/api/auth/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend returned an error
      alert(data.message || "Sign in failed");
    } else {
      // Sign in success
      alert("Sign in successful!");
      navigate("/admin/dashboard")
    }
  } catch (error) {
    alert("Network error: " + error.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "background.default" }}>
      {/* Left Panel - Static Decorative */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          flex: 1,
          position: "relative",
          bgcolor: "primary.main",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 64, fontWeight: "bold", mb: 2 }}>
          Karigar
        </Typography>
        <Divider sx={{ width: 96, height: 4, bgcolor: "primary.contrastText", mb: 4 }} />
        <Typography sx={{ fontSize: 18, opacity: 0.8, maxWidth: 400 }}>
          Empowering artisans, connecting craftsmanship with the world.
        </Typography>

        {/* Large K watermark */}
        <Typography
          sx={{
            position: "absolute",
            right: -80,
            bottom: -80,
            fontSize: 400,
            fontWeight: "bold",
            color: "primary.contrastText",
            opacity: 0.05,
            userSelect: "none",
          }}
        >
          K
        </Typography>
      </Box>

      {/* Right Panel - Sign In Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 4, lg: 8 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          {/* Mobile Header */}
          <Box sx={{ display: { xs: "block", lg: "none" }, textAlign: "center", mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              Karigar
            </Typography>
            <Divider sx={{ width: 64, height: 2, bgcolor: "text.primary", mx: "auto" }} />
          </Box>

          {/* Form Header */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Admin Sign In
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your credentials to access the admin dashboard
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                placeholder="admin@karigar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ color: "text.secondary" }}
              />
              <Button variant="text" size="small" onClick={() => alert("Forgot password clicked")}>
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              Protected admin area. Unauthorized access is prohibited.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignIn;
