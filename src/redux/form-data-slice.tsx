import { createSlice } from "@reduxjs/toolkit";

type FormDataState = {
  login: {
    email: string;
    password: string;
  };
  signup: {
    email: string;
    password: string;
    passwordConfirm: string;
    emailCode: string;
  };
};

const initialState: FormDataState = {
  login: {
    email: "",
    password: "",
  },
  signup: {
    email: "",
    password: "",
    passwordConfirm: "",
    emailCode: "",
  },
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setLoginField: (state, action) => {
      state.login = { ...state.login, ...action.payload };
    },
    setSignupField: (state, action) => {
      state.signup = { ...state.signup, ...action.payload };
    },
    clearFormData: (state) => {
      state.login = initialState.login;
      state.signup = initialState.signup;
    },
  },
});

export const { setLoginField, setSignupField, clearFormData } =
  formDataSlice.actions;

export default formDataSlice.reducer;
