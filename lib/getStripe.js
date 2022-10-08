import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51Lo2NKHuALG6UF6qfDcYOuL4HIiuYOPU0f0yYEtpZTgFfxolH4Ef9idcT5v3wMiGnyx7os6zP2c8ScwGQGNbcCX400a47w72Ra'
    );
  }
  return stripePromise;
};
export default getStripe;

// STRIPE_KEY =
//   pk_test_51Lo2NKHuALG6UF6qEEWWoJr54wzqcxb2wtcuRfgJJ5p9PqGHNCgW4weGRMtGnwdYuS9lqRx68c97jGUQtdS0gomH00TusoFlki;
