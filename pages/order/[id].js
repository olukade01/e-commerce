import dynamic from 'next/dynamic';
import React from 'react';

function OrderScreen() {
  return <div>[id]</div>;
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
