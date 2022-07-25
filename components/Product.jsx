import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div>
          <Image
            src={`${urlFor(image && image[0])}`}
            alt=""
            width={200}
            height={200}
          />
          <p>{name}</p>
          <p>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
