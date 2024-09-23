import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Updated to useNavigate
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Replaces useHistory
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (formData) => {
    if (!validateInput(formData)) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.endpoint}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        const { token, username, balance } = response.data;
        persistLogin(token, username, balance);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        navigate("/", { state: { from: "Login" } }); // Replaces history.push
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (data) => {
    const { username, password } = data;
    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }
    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    return true;
  };

  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => login(formData)}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "LOGIN TO QKART"
            )}
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
