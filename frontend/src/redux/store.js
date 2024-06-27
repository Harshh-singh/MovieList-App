import { movieReducer } from "./reducers/movieReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        movieReducer
    },
});