import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import { Cancel, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import jsCookie from 'js-cookie';
import Link from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Store } from '../lib/store';
import { Cart } from './';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getError } from '../lib/error';
import { useClickAway } from 'react-use';
import classes from '../lib/classes';

const Navbar = ({ darkMode, darkModeChangeHandler, userInfo }) => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    setTotalQuantities,
    clearCart,
    setTotalPrice,
  } = useStateContext();
  const { dispatch } = useContext(Store);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const ref = useRef();
  useClickAway(ref, () => {
    setAnchorEl(null);
  });
  const loginHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('shippingAddress');
    jsCookie.remove('paymentMethod');
    clearCart();
    setTotalQuantities(0);
    setTotalPrice(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantities');
    router.push('/');
  };

  const handleSidebarOpen = () => setSidebarVisible(true);
  const handleSidebarClose = () => setSidebarVisible(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-logo">
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          <p className="logo">
            <Link href="/">MUZZ</Link>
          </p>
        </div>
        <Drawer
          anchor="left"
          open={sidebarVisible}
          onClose={handleSidebarClose}
        >
          <List>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Shopping by category</Typography>
                <IconButton aria-label="close" onClick={handleSidebarClose}>
                  <Cancel />
                </IconButton>
              </Box>
            </ListItem>
            <Divider light />
            {categories.map((category) => (
              <NextLink
                key={category}
                href={`/search?category=${category}`}
                passHref
              >
                <ListItem button component="a" onClick={handleSidebarClose}>
                  <ListItemText primary={category}></ListItemText>
                </ListItem>
              </NextLink>
            ))}
          </List>
        </Drawer>
        <Box>
          <form className="container" onSubmit={submitHandler}>
            <Box sx={classes.searchForm}>
              <InputBase
                name="query"
                sx={classes.searchInput}
                placeholder="Search products"
                onChange={queryChangeHandler}
              />
              <IconButton
                type="submit"
                sx={classes.searchButton}
                aria-label="search"
              >
                <Search />
              </IconButton>
            </Box>
          </form>
        </Box>
        <div className="login-cart">
          <div>
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
          </div>
          {userInfo ? (
            <div ref={ref}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={loginHandler}
              >
                {userInfo.name.split(' ')[0]}
              </Button>
              <Menu
                id="simple-menu"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}
                hideBackdrop={true}
              >
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => loginMenuCloseHandler(e, '/order-history')}
                >
                  Order History
                </MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <p className="login">
              <Link href="/login">Login</Link>
            </p>
          )}
          <button className="cart-icon" onClick={() => setShowCart(true)}>
            <AiOutlineShopping />{' '}
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          {showCart && <Cart />}
        </div>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <Box sx={classes.searchForm}>
          <InputBase
            name="query"
            sx={classes.searchInput}
            placeholder="Search products"
            onChange={queryChangeHandler}
          />
          <IconButton
            type="submit"
            sx={classes.searchButton}
            aria-label="search"
          >
            <Search />
          </IconButton>
        </Box>
      </form>
    </div>
  );
};

export default Navbar;
