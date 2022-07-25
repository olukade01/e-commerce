import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import { client } from "../lib/client";
// import product from "../sanity_ecommerce/schemas/product";

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div>
        <h2>Best Seller Products</h2>
        <p>speaker: There are many variations passages </p>
      </div>
      <div>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
