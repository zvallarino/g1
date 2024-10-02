// components/CircularLogo.js
import React from 'react';
import Image from 'next/image';

const CircularLogo = ({ src, alt, className }) => {
  return (
    <div className={`relative overflow-hidden border-8 border-black ${className}`}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="rounded-full"
      />
    </div>
  );
};

export default CircularLogo;