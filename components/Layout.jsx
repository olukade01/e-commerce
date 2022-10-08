import Head from 'next/head';
import React, { useContext } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Store } from '../lib/store';
import jsCookie from 'js-cookie';

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode, userInfo } = state;
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div className="layout">
      <Head>
        <title>Muzzammil e-commerce</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Navbar
            darkMode={darkMode}
            userInfo={userInfo}
            darkModeChangeHandler={darkModeChangeHandler}
          />
        </header>
        <main className="main-container">{children}</main>
        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;

// SANITY_TOKEN = skXknL0xhYedyOmirUlelumNDTQHu54E84iQlr2EvlaZGdBaAEX3tRE1xSEUAtyeAPKVKWOGZeUboV6tyDfK8Ayrwd5iIMHDPiVZ9pHWS4UHnAweu9DNxLLm3RCFhunHD4pkUZAJOSqpNzPAD8DHSXZmcj4ocDHMXTAekz4vZO9DP61if6SU
