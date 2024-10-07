import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/user";

export const store = configureStore({
    reducer: {
        user: todoReducer,
    },
});