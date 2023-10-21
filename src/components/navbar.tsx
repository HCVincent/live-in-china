import React from "react";
import Container from "./ui/container";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-xl">HOME</p>
        </Link>
        <div>
          <Button variant="ghost">Login in</Button>
          <Button variant="outline" className="ml-2">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
