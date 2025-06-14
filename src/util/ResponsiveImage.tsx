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
export type ImagePositionType = 'top' | 'center' | 'bottom';
interface ResponsiveImageProps {
  imageData: ResponsiveImageData;
  alt: string;
  lazyLoad?: boolean;
  className?: string;
  sizes?: string;
  onLoad?: () => void;
  title?: string;
  imagePosition?: ImagePositionType;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  imageData,
  alt,
  lazyLoad = true,
  className = '',
  sizes = '100vw',
  onLoad,
  title,
  imagePosition = 'center'
}) => {
  const positionClass = imagePosition === 'top'
    ? 'object-top'
    : imagePosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';
  return (
    <picture>
      <source srcSet={imageData.srcSet} type="image/webp" sizes={sizes} />
      <img
        src={imageData.src}
        alt={alt}
        loading={lazyLoad ? 'lazy' : 'eager'}
        width={imageData.width}
        height={imageData.height}
        className={`${className} ${positionClass}`}
        onLoad={onLoad}
        {...(title ? { title } : {})}
      />
    </picture>)
};

export default ResponsiveImage;
