import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import StateContext from '../context/StateContext';
import '../styles/globals.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StoreProvider } from '../lib/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <StateContext>
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </PayPalScriptProvider>
        </StoreProvider>
      </StateContext>
    </CacheProvider>
  );
}

export default MyApp;
