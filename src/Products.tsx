import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { addToBasket } from "./features/checkoutStore";
import { connect } from "react-redux";
import Cart from "./Cart";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type DispatchProps = {
  addToBasket: (product: Product) => void;
  cartItems: Product[];
};

type ProductListState = {
  products: Product[];
};

const mapStateToProps = (state: any) => ({
  cartItems: state.basket.items,
});

class ProductList extends React.Component<DispatchProps, ProductListState> {
  state: ProductListState = {
    products: [],
  };

  componentDidMount() {
    axios.get("https://dummyjson.com/products?limit=20&skip=20").then((res) => {
      const products: Product[] = res.data.products;
      this.setState({ products });
    });
  }

  addToCart = (product: Product) => {
    this.props.addToBasket(product);
  };

  render() {
    return (
      <div>
        <Cart text="Cart is::" />
        <Divider />
        <h1>Products</h1>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {this.state.products.map((product) => (
            <Grid item key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => this.addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, { addToBasket })(ProductList);
