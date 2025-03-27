import React from 'react';
import styles from './Gallery.module.scss';
import ComponentContainer from '../../Components/ComponentContainer/ComponentContainer';
import GalleryCarousel from '../../Components/GalleryCarousel/GalleryCarousel';
import { ResponsiveImageData } from '../../Components/ResponsiveImage/ResponsiveImage';
import galleryImg1 from '../../Assets/placeholderImage/image1.jpeg';
import galleryImg2 from '../../Assets/placeholderImage/image2.jpeg';
import galleryImg3 from '../../Assets/placeholderImage/image3.jpeg';
import galleryImg4 from '../../Assets/placeholderImage/image4.jpeg';
import galleryImg5 from '../../Assets/placeholderImage/image5.jpeg';
import galleryImg6 from '../../Assets/placeholderImage/image6.jpeg';
import galleryImg7 from '../../Assets/placeholderImage/image7.jpeg';
import galleryImg8 from '../../Assets/placeholderImage/image8.jpeg';
import galleryImg9 from '../../Assets/placeholderImage/image9.jpeg';
import galleryImg10 from '../../Assets/placeholderImage/image10.jpeg';
import galleryImg11 from '../../Assets/placeholderImage/image11.jpeg';
import galleryImg12 from '../../Assets/placeholderImage/image12.jpeg';
import galleryImg13 from '../../Assets/placeholderImage/image13.jpeg';
import galleryImg14 from '../../Assets/placeholderImage/image14.jpeg';
import galleryImg15 from '../../Assets/placeholderImage/image15.jpeg';
import galleryImg16 from '../../Assets/placeholderImage/image16.jpeg';
import galleryImg17 from '../../Assets/placeholderImage/image17.jpeg';
import galleryImg18 from '../../Assets/placeholderImage/image18.jpeg';
import galleryImg19 from '../../Assets/placeholderImage/image19.jpeg';
import galleryImg20 from '../../Assets/placeholderImage/image20.jpeg';
import galleryImg21 from '../../Assets/placeholderImage/image21.jpg';

const images = [
  { imageData: galleryImg1 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg2 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg3 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg4 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg5 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg6 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg7 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg8 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg9 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg10 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg11 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg12 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg13 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg14 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg15 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg16 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg17 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg18 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg19 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg20 as unknown as ResponsiveImageData, alt: 'gallery image' },
  { imageData: galleryImg21 as unknown as ResponsiveImageData, alt: 'gallery image 21' },
];

const Gallery: React.FC = () => (
  <ComponentContainer containerClassName={`container ${styles.Gallery}`} heading="Gallery">
    <GalleryCarousel images={images} />
  </ComponentContainer>
);

export default Gallery;
