// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"; // Import userSlice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
