import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authSlice from  "./auth/auth-slice";
import baseApi from "./api/baseApiEndpoints";
import notificationSlice from "./notification/notification-slice";

const combinedReducer = combineReducers({
  auth: authSlice.reducer,
  notification: notificationSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
const store = configureStore({
  reducer: (rootState, action) => {
    let state = rootState;
    if (authSlice.actions.logout.match(action)) {
      const { api } = state;
      state = { api };
    }
    return combinedReducer(state, action);
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
