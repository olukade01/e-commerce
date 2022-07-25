import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div>
      <p>
        <Link href="/">MUZ STORE</Link>
      </p>
      <button onClick="">
        <AiOutlineShopping /> <span>1</span>
      </button>
    </div>
  );
};

export default Navbar;
