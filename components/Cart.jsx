import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    decreaseQty,
    increaseQty,
    qty,
  } = useStateContext();

  return (
    <div ref={cartRef}>
      <div>
        <button onClick={() => setShowCart(false)} type="button">
          <AiOutlineLeft />
          <span>Your Cart</span> <span>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)}>
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        )}
        <div>
          {
            // cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id}>
                {console.log({ cartItems })}
                <Image alt="" src={urlFor(item?.image[0])} />
                <div>
                  <div>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div>
                    <div>
                      <p>
                        <span onClick={() => {}}>
                          <AiOutlineMinus />
                        </span>
                        <span>0</span>
                        <span onClick={() => {}}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type="button" onClick={() => {}}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
