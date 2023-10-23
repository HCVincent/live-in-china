// modalSlice.ts

import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  isModalOpen: boolean;
  activeModal: "login" | "signup" | "emailcode";
};

const initialState: ModalState = {
  isModalOpen: false,
  activeModal: "login",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showLoginModal: (state) => {
      state.isModalOpen = true;
      state.activeModal = "login";
    },
    showSignupModal: (state) => {
      state.isModalOpen = true;
      state.activeModal = "signup";
    },
    showEmailCodeModal: (state) => {
      state.isModalOpen = true;
      state.activeModal = "emailcode";
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  showLoginModal,
  showSignupModal,
  closeModal,
  showEmailCodeModal,
} = modalSlice.actions;
export default modalSlice.reducer;
