import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom"; // Updated import for react-router-dom v6
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const navigate = useNavigate(); // Updated to use useNavigate

  const handleBackToExplore = () => {
    navigate("/"); // Updated for react-router-dom v6
  };

  const handleLogin = () => {
    navigate("/login"); // Updated for react-router-dom v6
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Updated for react-router-dom v6
  };

  const username = localStorage.getItem("username");

  return (
    <Box className="header">
      <Box className="header-title">
        <img
          src="logo_light.svg"
          alt="QKart-icon"
          onClick={() => navigate("/")} // Updated for react-router-dom v6
        />
      </Box>

      <div className="search-desktop">{children}</div>

      <div>
        {hasHiddenAuthButtons ? (
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={handleBackToExplore}
          >
            Back to explore
          </Button>
        ) : username ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src="public/avatar.png" alt={username} />
            <span className="username-text">{username}</span>
            <Button
              variant="contained"
              className="logout-button"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              className="login-button"
              onClick={handleLogin}
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              className="register-button"
              onClick={() => navigate("/register")} // Updated for react-router-dom v6
            >
              REGISTER
            </Button>
          </Stack>
        )}
      </div>
      <div className="search-mobile">{children}</div>
    </Box>
  );
};

export default Header;
