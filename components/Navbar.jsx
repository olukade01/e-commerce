import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
// import Cart from "./Cart";
import { Cart } from "./";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div>
      <p>
        <Link href="/">MUZ STORE</Link>
      </p>
      <button onClick={() => setShowCart(true)}>
        <AiOutlineShopping /> <span>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
