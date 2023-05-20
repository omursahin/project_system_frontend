import { createSlice } from "@reduxjs/toolkit";

// https://iamhosseindhv.com/notistack/demos#variants

const initialState = {
  notification: null,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showMessage(state, action) {
      state.notification = {
        vertical: action.payload.vertical || "bottom",
        horizontal: action.payload.horizontal || "start",
        header: action.payload.header,
        message: action.payload.message,
        variant: action.payload.variant || "default",
      };
    },
    showLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
