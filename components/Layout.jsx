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

// SANITY_TOKEN =
//   sksL4WviOaerW8GOM59MVENpi7uu4pHNv1sLdIaalQFwMX1oA4pzc49oUi34cJ1xodx2xksR5bP11tARSlNlYLIjfNvVZABARLKdp2V1gTzNAC5b9M6AX0FdeWExOkNvTriUGylLN42TFkBAoC06XW37S2cypdj1ilF8cUQyagbF1YqAgSva;
