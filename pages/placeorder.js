import { Card, Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import CheckoutCarousel from '../components/CheckoutCarousel';

const placeorder = () => {
  return (
    <div>
      <CheckoutCarousel activeStep={3}></CheckoutCarousel>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>
    </div>
  );
};

export default placeorder;
