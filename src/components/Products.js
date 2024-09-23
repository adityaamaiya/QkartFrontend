import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";
import Cart, { generateCartItemsFrom, getTotalCartValue } from "./Cart";
import { useNavigate, Link } from "react-router-dom";

/**
 * @typedef {Object} CartItem - Data on product added to cart
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [searchstr, setSearchstr] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isLoggedin, setLoggedin] = useState(false);
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Updated to use useNavigate instead of useHistory

  // Fetch products from the backend
  const performAPICall = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.endpoint}/products`);
      setProducts(response.data);
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      enqueueSnackbar(
        err.response ? err.response.data.message : "Failed to fetch products.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  // Perform product search with debounce
  const performSearch = async (text) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );

      if (response.data.length > 0) {
        setProducts(response.data);
      } else {
        setProducts([]);
        setError("No Products Found");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setProducts([]);
        setError("No Products Found");
      } else {
        setError(error.response ? error.response.data.message : error.message);
        enqueueSnackbar(
          error.response
            ? error.response.data.message
            : "Failed to fetch products.",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input handler
  const debounceSearch = (event) => {
    const searchValue = event.target.value;
    setSearchstr(searchValue);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (searchValue.trim() !== "") {
        performSearch(searchValue);
      } else {
        performAPICall();
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  // Fetch the user's cart
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      const res = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
      return res.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
      return null;
    }
  };

  // Check if item exists in the cart
  const isItemInCart = (items, productId) => {
    return items.findIndex((item) => item.productId === productId) !== -1;
  };

  // Add item to cart and update it
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar("Login to add an item to the cart", { variant: "warning" });
      navigate("/login");
      return;
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar("Item already in cart. Use sidebar cart to update quantity or remove item", {
        variant: "warning",
      });
      return;
    }

    try {
      const res = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cartItems = generateCartItemsFrom(res.data, products);
      setItems(cartItems);
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not update cart details. Check if backend is running.",
          { variant: "error" }
        );
      }
    }
  };

  // Fetch products and cart data on mount
  useEffect(() => {
    performAPICall();
  }, []);

  useEffect(() => {
    if (token) {
      setLoggedin(true);
      const fetchCartAndProductData = async () => {
        const cartData = await fetchCart(token);
        const productData = await performAPICall();
        if (productData && cartData) {
          const cartItems = generateCartItemsFrom(cartData, productData);
          setItems(cartItems);
        }
      };
      fetchCartAndProductData();
    } else {
      setLoggedin(false);
    }
  }, [token]);

  return (
    <div>
      <Header>
        <TextField
          className="search-desktop search"
          size="small"
          fullWidth
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          value={searchstr}
          onChange={debounceSearch}
        />
      </Header>
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          className: "search",
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        value={searchstr}
        onChange={debounceSearch}
      />
      <Grid container spacing={1} sx={{ backgroundColor: "#E9F5E1" }}>
        <Grid item xs={12} md={isLoggedin ? 9 : 12}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span> to your door step
            </p>
          </Box>

          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="50vh">
              <CircularProgress />
              <p>Loading Products...</p>
            </Box>
          ) : error ? (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="50vh">
              <SentimentDissatisfied />
              <p>{error}</p>
            </Box>
          ) : (
            <Grid container spacing={2} className="product-grid">
              {products.map((product) => (
                <Grid item xs={6} md={3} key={product._id}>
                  <ProductCard
                    product={product}
                    handleAddToCart={async () => {
                      await addToCart(token, items, products, product._id, 1, {
                        preventDuplicate: true,
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {isLoggedin ? (
          <Grid item className="cart-container" md={3} xs={12}>
            <Cart
              products={products}
              items={items}
              handleQuantity={addToCart}
              hasCheckOutButton={true}
              isReadOnly={false}
            />
          </Grid>
        ) : null}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
