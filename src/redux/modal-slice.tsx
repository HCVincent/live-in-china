// modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isModalOpen: boolean;
  activeModal: "login" | "signup";
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
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { showLoginModal, showSignupModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
