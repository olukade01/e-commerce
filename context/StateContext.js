import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext();

const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkItemInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevValue) => prevValue + product.price * quantity);
    setTotalQuantities((prevValue) => prevValue + quantity);

    if (checkItemInCart) {
      const updatedCartItem = cartItems.map((item) => {
        if (item._id === product._id)
          return { ...item, quantity: item.quantity + quantity };
      });
      setCartItems(updatedCartItem);
    } else {
      product.quantity = quantity;

      //SUBJECT TO REVIEW
      setCartItems(cartItems.concat(product));
    }
    toast.success(`${quantity} ${product.name} added to cart.`);
  };
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
