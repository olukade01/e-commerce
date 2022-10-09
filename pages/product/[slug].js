import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { Rating } from '@mui/material';

const ProductDetails = ({ product, products }) => {
  const {
    image,
    name,
    details,
    price,
    rating,
    numReviews,
    category,
    brand,
    inStock,
  } = product;

  const {
    decreaseQty,
    increaseQty,
    qty,
    onAdd,
    setShowCart,
    indexx,
    setIndexx,
  } = useStateContext();

  const handleBuy = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  console.log({ price });
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              alt=""
              // width={250}
              // height={250}
              className="product-detail-image"
              src={`${urlFor(image && image[indexx])}`}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                alt=""
                // width={250}
                // height={250}
                src={`${urlFor(item)}`}
                className={
                  i === indexx ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndexx(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <Rating value={rating} readOnly></Rating>
            <p>({numReviews})</p>
          </div>
          <h4>Category:</h4>
          <p>{category}</p>
          <h4>Brand:</h4>
          <p>{brand}</p>
          <h4>Details:</h4>
          <p>{details}</p>
          <h4>Status:</h4>
          <p className={`${inStock ? 'instock' : 'unavailable'}`}>
            {inStock > 0 ? 'In Stock' : 'Unavailable'}
          </p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuy}>
              Buy Now{' '}
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Things you may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
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
    fallback: 'blocking',
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
