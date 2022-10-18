import Link from 'next/link';
import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 MUZ Store All rights reserved</p>
      <p className="icons">
        <Link href="https://instagram.com/sir_olukade">
          <AiFillInstagram />
        </Link>
        <Link href="https://twitter.com/olukadeM">
          <AiOutlineTwitter />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
