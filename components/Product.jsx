import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';
import { Rating } from '@mui/material';
import { useStateContext } from '../context/StateContext';

const Product = ({ product: { image, name, slug, price, rating } }) => {
  const { setIndexx } = useStateContext();
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div onClick={() => setIndexx(0)} className="product-card">
          <Image
            src={`${urlFor(image && image[0])}`}
            alt=""
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
          <Rating value={rating} readOnly></Rating>
        </div>
      </Link>
    </div>
  );
};

export default Product;
