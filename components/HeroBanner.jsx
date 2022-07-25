import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div>
      <div>
        <p>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <Image
          src={`${urlFor(heroBanner.image)}`}
          width={200}
          height={200}
          alt="headphone"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button>{heroBanner.buttonText}</button>
          </Link>
          <div>
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
