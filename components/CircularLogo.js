// components/CircularLogo.js
import React from 'react';
import Image from 'next/image';

const CircularLogo = ({ src, alt, className, size = '24' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-white border-black border-r-2 border-b-2 rounded-br-lg w-${size} h-${size} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
      />
    </div>
  );
};

export default CircularLogo;