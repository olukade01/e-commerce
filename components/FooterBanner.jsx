import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div>
      <div>
        <div>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button>{buttonText}</button>
          </Link>
        </div>
        <Image src={`${urlFor(image)}`} alt="" width={200} height={200} />
      </div>
    </div>
  );
};

export default FooterBanner;
