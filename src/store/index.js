import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";

import baseApi from "./api/baseApiEndpoints";

const combinedReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
