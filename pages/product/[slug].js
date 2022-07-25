import Image from "next/image";
import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { Product } from "../../components";

const ProductDetails = ({
  product: { image, name, details, price },
  products,
}) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div>
        <div>
          <div>
            <Image
              alt=""
              width={250}
              height={250}
              src={`${urlFor(image && image[index])}`}
            />
          </div>
          <div>
            {image?.map((item, i) => (
              <Image
                key={i}
                alt=""
                width={250}
                height={250}
                src={`${urlFor(item)}`}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1>{name}</h1>
          <div>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p>${price}</p>
          <div>
            <h3>Quantity:</h3>
            <p>
              <span onClick="">
                <AiOutlineMinus />
              </span>
              <span onClick="">0</span>
              <span onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div>
            <button onClick="">Add to Cart</button>
            <button onClick="">Buy Now </button>
          </div>
        </div>
      </div>
      <div>
        <h2>Things you may also like</h2>
        <div>
          <div>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'product'] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);
  const productsQuery = "*[_type == 'product']";
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
