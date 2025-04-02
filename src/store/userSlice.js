import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Đọc từ localStorage nếu có
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Lưu vào localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Xóa khỏi localStorage khi logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
