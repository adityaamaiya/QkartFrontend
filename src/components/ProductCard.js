import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" height="50px">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" my={2}> {/* Updated my="15px" to my={2} for proper spacing in MUI */}
            ${product.cost}
          </Typography>
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            aria-label={`Rating: ${product.rating} stars`}
            role="img"
          />
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <Button
          className="card-button"
          size="small"
          color="primary"
          startIcon={<AddShoppingCartOutlined />}
          onClick={() => handleAddToCart(product._id)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
