import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51Lo2NKHuALG6UF6qEEWWoJr54wzqcxb2wtcuRfgJJ5p9PqGHNCgW4weGRMtGnwdYuS9lqRx68c97jGUQtdS0gomH00TusoFlki"
    );
  }
  return stripePromise;
};
export default getStripe;
