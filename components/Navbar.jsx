import { Switch } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';

const Navbar = ({ darkMode, darkModeChangeHandler, userInfo }) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">MUZ STORE</Link>
      </p>
      <div>
        <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
      </div>
      {userInfo ? (
        <p className="logo">
          <Link href="/profile">{userInfo.name}</Link>
        </p>
      ) : (
        <p className="logo">
          <Link href="/login">Login</Link>
        </p>
      )}
      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />{' '}
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
