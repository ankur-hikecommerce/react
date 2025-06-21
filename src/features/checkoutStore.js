import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBasket, removeFromBasket } = checkoutSlice.actions;
export default checkoutSlice.reducer;
