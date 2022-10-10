import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import product from './product';
import banner from './banner';
import user from './user';
import order from './order';
import orderItem from './orderItem';
import shippingAddress from './shippingAddress';
import paymentResult from './paymentResult';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    banner,
    user,
    order,
    orderItem,
    shippingAddress,
    paymentResult,
  ]),
});
