import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import AuthButton from "./auth-buttons";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-xl">HOME</p>
        </Link>
        <div className="flex">
          <ModeToggle />
          <AuthButton />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
