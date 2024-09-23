import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// Data Structures Definitions
export const generateCartItemsFrom = (cartData, productsData) => {
  if (!cartData) return [];
  return cartData.map((item) => ({
    ...item,
    ...(productsData.find((product) => item.productId === product._id) || {}),
  }));
};

export const getTotalCartValue = (items = []) => {
  return items.reduce((total, item) => total + item.qty * item.cost, 0);
};

export const getTotalItems = (items = []) => {
  return items.reduce((total, item) => total + item.qty, 0);
};

const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => (
  <Stack direction="row" alignItems="center">
    {isReadOnly ? (
      <Box padding="0.5rem" data-testid="item-qty">Qty: {value}</Box>
    ) : (
      <>
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
        <Box padding="0.5rem" data-testid="item-qty">{value}</Box>
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      </>
    )}
  </Stack>
);

const Cart = ({ products, items = [], handleQuantity, isReadOnly, hasCheckOutButton }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {items.map((item) => (
          <Box key={item.productId}>
            {item.qty > 0 ? (
              <Box className="cart-row" display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img src={item.image} alt={item.name} width="100%" height="100%" />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="6rem" paddingX="1rem">
                  <div>{item.name}</div>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <ItemQuantity
                      handleAdd={async () => {
                        await handleQuantity(token, items, products, item.productId, item.qty + 1);
                      }}
                      handleDelete={async () => {
                        await handleQuantity(token, items, products, item.productId, item.qty - 1);
                      }}
                      value={item.qty}
                      isReadOnly={isReadOnly}
                    />
                    <Box padding="0.5rem" fontWeight="700">${item.cost}</Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        ))}

        <Box padding="1rem" display="flex" justifyContent="space-between" alignItems="center">
          <Box color="#3C3C3C" alignSelf="center">Order total</Box>
          <Box color="#3C3C3C" fontWeight="700" fontSize="1.5rem" alignSelf="center" data-testid="cart-total">
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        {hasCheckOutButton && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>

      {isReadOnly && (
        <Box className="cart" padding="1rem">
          <h2>Order Details</h2>
          <Box className="cart-row">
            <p>Products</p>
            <p>{getTotalItems(items)}</p>
          </Box>
          <Box className="cart-row">
            <p>Subtotal</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
          <Box className="cart-row">
            <p>Shipping Charges</p>
            <p>$2</p>
          </Box>
          <Box className="cart-row">
            <p>Total Amount</p>
            <p>${2 + getTotalCartValue(items)}</p>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
