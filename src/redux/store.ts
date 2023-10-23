"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./count-slice";
import modalReducer from "./modal-slice";
import formDataReducer from "./form-data-slice";

const rootReducer = combineReducers({
    counter: counterReducer,
    //add all your reducers here
    modal: modalReducer,
    formData: formDataReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;