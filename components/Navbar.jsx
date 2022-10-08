import { Button, Menu, MenuItem, Switch } from '@mui/material';
import jsCookie from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Store } from '../lib/store';
import { Cart } from './';

const Navbar = ({ darkMode, darkModeChangeHandler, userInfo }) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { dispatch } = useContext(Store);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    localStorage.remove('cartItems');
    localStorage.remove('totalPrice');
    localStorage.remove('totalQuantities');
    router.push('/');
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">MUZ STORE</Link>
      </p>
      <div>
        <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
      </div>
      {userInfo ? (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={loginHandler}
          >
            {userInfo.name}
          </Button>
          <Menu
            id="simple-menu"
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={loginMenuCloseHandler}
          ></Menu>
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>
            Order History
          </MenuItem>
          <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
        </div>
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
