import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutCarousel from '../components/CheckoutCarousel';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { getError } from '../lib/error';
import { Store } from '../lib/store';

function Placeorder() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;
  const { cartItems, clearCart } = useStateContext();
  console.log(cartItems);
  const router = useRouter();
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems?.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    // if (cartItems.length === 0) {
    //   router.push('/cart');
    // }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems.map((x) => ({
            ...x,
            inStock: undefined,
            slug: undefined,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            // authorization: `Bearer sksL4WviOaerW8GOM59MVENpi7uu4pHNv1sLdIaalQFwMX1oA4pzc49oUi34cJ1xodx2xksR5bP11tARSlNlYLIjfNvVZABARLKdp2V1gTzNAC5b9M6AX0FdeWExOkNvTriUGylLN42TFkBAoC06XW37S2cypdj1ilF8cUQyagbF1YqAgSva`,
          },
        }
      );
      // ${userInfo.token}
      clearCart();
      localStorage.removeItem('cartItems');
      setLoading(false);
      router.push(`/order/${data}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <CheckoutCarousel activeStep={3}></CheckoutCarousel>
      <Typography component="h1" variant="h3">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card
          //  sx={classes.section}
          >
            <List>
              <ListItem>
                <Typography component="h2" variant="h4">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => router.push('/shipping')}
                  variant="contianed"
                  color="secondary"
                >
                  Edit
                </Button>
              </ListItem>
            </List>
          </Card>
          <Card
          // sx={classes.section}
          >
            <List>
              <ListItem>
                <Typography component="h2" variant="h4">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
              <ListItem>
                <Button
                  onClick={() => router.push('/payment')}
                  variant="contianed"
                  color="secondary"
                >
                  Edit
                </Button>
              </ListItem>
            </List>
          </Card>
          <Card
          //  sx={classes.section}
          >
            <List>
              <ListItem>
                <Typography component="h2" variant="h4">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems?.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={`${urlFor(item.image[0])}`}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <Table Cell>
                            <NextLink
                              href={`/product/${item.slug.current}`}
                              passHref
                            >
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </Table>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card
          // sx={classes.section}
          >
            <List>
              <ListItem>
                <Typography variant="h4">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false });
