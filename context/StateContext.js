import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

const StateContext = ({ children }) => {
  const getLocalStorage = (name) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(name);

      if (storage) return JSON.parse(localStorage.getItem(name));

      if (name === 'cartItems') return [];

      return 0;
    }
  };
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(getLocalStorage('cartItems'));
  const [totalPrice, setTotalPrice] = useState(getLocalStorage('totalPrice'));
  const [totalQuantities, setTotalQuantities] = useState(
    getLocalStorage('totalQuantities')
  );
  const [qty, setQty] = useState(1);
  const [indexx, setIndexx] = useState(0);

  let foundProduct;
  let index;

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity) => {
    const checkItemInCart = cartItems.find((item) => item._id === product._id);

    if (checkItemInCart) {
      if (product.inStock < quantity) {
        toast.error(`Sorry, ${product.name} is out of stock`);
        return;
      }
      setTotalPrice((prevValue) => prevValue + product.price * quantity);
      setTotalQuantities((prevValue) => prevValue + quantity);
      const updatedCartItem = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCartItems(updatedCartItem);
    } else {
      if (product.inStock < quantity) {
        toast.error(`Sorry, ${product.name} is out of stock`);
        return;
      }
      setTotalPrice((prevValue) => prevValue + product.price * quantity);
      setTotalQuantities((prevValue) => prevValue + quantity);
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quantity} ${product.name} added to cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    setTotalPrice(
      (prevValue) => prevValue - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prevValue) => prevValue - foundProduct.quantity);
    setCartItems(newCartItems);
  };
  const clearCart = () => setCartItems([]);

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === 'inc') {
      const updatedCart = cartItems.map((item, indx) => {
        if (indx === index) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      setCartItems(updatedCart);
      setTotalPrice((prevValue) => prevValue + foundProduct.price);
      setTotalQuantities((prevValue) => prevValue + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        const updatedCart = cartItems.map((item, indx) => {
          if (indx === index) return { ...item, quantity: item.quantity - 1 };
          return item;
        });
        setCartItems(updatedCart);
        setTotalPrice((prevValue) => prevValue - foundProduct.price);
        setTotalQuantities((prevValue) => prevValue - 1);
      }
    }
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
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        indexx,
        setIndexx,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
