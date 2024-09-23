import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Thanks.css";

const Thanks = () => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate from React Router v6

  const routeToProducts = () => {
    navigate("/"); // Updated navigation method for React Router v6
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // Redirect to homepage if not authenticated
    }
  }, [navigate]); // Updated dependency array to include navigate

  return (
    <>
      <Header />
      <Box className="greeting-container">
        <h2>Yay! It's ordered 😃</h2>
        <p>You will receive an invoice for your order shortly.</p>
        <p>Your order will arrive in 7 business days.</p>
        <p id="balance-overline">Wallet Balance</p>
        <p id="balance">${localStorage.getItem("balance")} Available</p>
        <Button
          variant="contained"
          size="large"
          id="continue-btn"
          onClick={routeToProducts}
        >
          Continue Shopping
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default Thanks;
