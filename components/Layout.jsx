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
  const { darkMode } = state;
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
