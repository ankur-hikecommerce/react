import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

type Product = {
  title: string;
  quantity: number;
  price: number;
};

type CartProps = {
  text?: string;
  mode?: "browse" | "confirm";
};

function Cart({
  text = "Browse the items in your cart and then click Checkout",
  mode = "browse",
}: CartProps) {
  const products: Product[] = useSelector(
    (state: RootState) => state.basket.items
  );
  const [confirmed, setConfirmed] = useState(false);

  const totalPrice = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{text}</p>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.title}
              secondary={"Quantity: " + product.quantity}
            />
          </ListItem>
        ))}
      </List>
      <div>
        Total Price:{" "}
        {products.reduce(
          (total, { price, quantity }) => total + price * quantity,
          0
        )}
      </div>
      {mode === "browse" ? (
        <Button
          style={{ marginBottom: 10 }}
          href={"/checkout"}
          variant="contained"
        >
          Checkout
        </Button>
      ) : (
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          onClick={handleConfirm}
        >
          Confirm Order
        </Button>
      )}
      {confirmed && (
        <div
          style={{
            marginTop: "1rem",
            background: "#f3f3f3",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            ✅ Order Confirmed!
          </Typography>
          <Typography>
            Thank you for your order. Here’s what you’ve ordered:
          </Typography>
          <ul>
            {products.map((p, i) => (
              <li key={i}>
                {p.quantity} x {p.title} – {p.price * p.quantity}
              </li>
            ))}
          </ul>
          <Typography>
            <strong>Total: ₹{totalPrice}</strong>
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Cart;
