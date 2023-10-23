"use client";

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  showLoginModal,
  showSignupModal,
} from "@/redux/modal-slice";
import { Button } from "./ui/button";
import { Auth } from "aws-amplify";
type AuthButtonProps = {};

const AuthButton: React.FC<AuthButtonProps> = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  async function fetchUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error getting current user: ", error);
    }
  }
  useEffect(() => {
    // Function to handle the custom event
    function handleUserLoggedInEvent() {
      fetchUser();
    }

    // Set up the event listener
    window.addEventListener("userLoggedIn", handleUserLoggedInEvent);

    fetchUser(); // Initial fetch

    // Cleanup: remove the event listener on component unmount
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedInEvent);
    };
  }, []);
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setCurrentUser(null); // Reset the current user after logging out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="">
      {currentUser ? (
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
export default AuthButton;
