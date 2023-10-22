//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./count-slice";
import modalReducer from "./modal-slice";

const rootReducer = combineReducers({
    counter: counterReducer,
    //add all your reducers here
    modal: modalReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;