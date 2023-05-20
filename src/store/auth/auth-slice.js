import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

// TODO RTQ Query kullanılacak
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
