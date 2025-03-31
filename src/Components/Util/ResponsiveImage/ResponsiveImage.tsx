import React from 'react';

export interface ResponsiveImageData {
  src: string;
  srcSet: string;
  images: { path: string; width: number }[];
  width: number;
  height: number;
  placeholder?: string;
  toString: () => string;
}

interface ResponsiveImageProps {
  imageData: ResponsiveImageData;
  alt: string;
  lazyLoad?: boolean;
  className?: string;
  sizes?: string;
  onLoad?: () => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  imageData,
  alt,
  lazyLoad = true,
  className = '',
  sizes = '100vw',
  onLoad,
}) => (
  <picture>
    <source srcSet={imageData.srcSet} type="image/webp" sizes={sizes} />
    <img
      src={imageData.src}
      alt={alt}
      loading={lazyLoad ? 'lazy' : 'eager'}
      width={imageData.width}
      height={imageData.height}
      className={className}
      onLoad={onLoad}
    />
  </picture>
);

export default ResponsiveImage;
