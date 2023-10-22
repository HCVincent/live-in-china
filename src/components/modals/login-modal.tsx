"use client";

import { showSignupModal } from "@/redux/modal-slice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

export const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Login</h2>
      <div>
        <Button onClick={() => dispatch(showSignupModal())}>
          Switch to Signup
        </Button>
      </div>
    </div>
  );
};
