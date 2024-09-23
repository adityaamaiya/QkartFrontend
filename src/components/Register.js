import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Updated to useNavigate instead of useHistory
  const [loading, setLoading] = useState(false);

  /**
   * Register function - triggered when the user clicks "Register Now"
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   */
  const register = async (formData) => {
    if (!validateInput(formData)) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        enqueueSnackbar("Registered successfully", { variant: "success" });
        navigate("/login", { from: "Register" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again later", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Validate user input before making API request
   * @param {{ username: string, password: string, confirmPassword: string }} data
   * @returns {boolean} Whether the validation passed or not
   */
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;
    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }
    if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    return true;
  };

  // State to track form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" minHeight="100vh">
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
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
            helperText="Password must be at least 6 characters"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleInputChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleInputChange}
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => register(formData)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register Now"}
          </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
