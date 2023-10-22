"use client";

import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  showLoginModal,
  showSignupModal,
} from "@/redux/modal-slice";
import { Button } from "./ui/button";
type AuthButtonProps = {};

const AuthButton: React.FC<AuthButtonProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <Button variant="ghost" onClick={() => dispatch(showLoginModal())}>
        Login
      </Button>
      <Button
        variant="outline"
        className="ml-2"
        onClick={() => dispatch(showSignupModal())}
      >
        Sign Up
      </Button>
    </div>
  );
};
export default AuthButton;
