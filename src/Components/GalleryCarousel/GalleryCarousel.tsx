import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GalleryCarousel.module.scss';
import Modal from '../Modal/Modal';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CircleLoader from '../CircleLoader/CircleLoader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// Import our custom ResponsiveImage component.
import ResponsiveImage, { ResponsiveImageData } from '../ResponsiveImage/ResponsiveImage';

export interface ImageProps {
  imageData: ResponsiveImageData; // <- Update here
  alt: string;
}

interface GalleryCarouselProps {
  images: ImageProps[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 90 },
      opacity: { duration: 0.5 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  }),
};

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [[selectedImage, direction], setSelectedImage] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const displaySize = useSelector((state: RootState) => state.accessibility.displaySize);
  const thumbnailGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isCarouselOpen ? 'hidden' : '';
    const handleScroll = (e: WheelEvent) => {
      if (isCarouselOpen) {
        e.deltaY > 0 ? nextImage() : prevImage();
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isCarouselOpen, selectedImage]);

  const openCarousel = (index: number) => {
    setSelectedImage([index, 0]);
    setIsLoading(true);
    setCarouselOpen(true);
  };

  const nextImage = () => {
    const newIndex = (selectedImage + 1) % images.length;
    setSelectedImage([newIndex, 1]);
    setIsLoading(true);
    centerThumbnail(newIndex);
  };

  const prevImage = () => {
    const newIndex = (selectedImage - 1 + images.length) % images.length;
    setSelectedImage([newIndex, -1]);
    setIsLoading(true);
    centerThumbnail(newIndex);
  };

  const setCurrentImage = (index: number) => {
    setSelectedImage([index, 0]);
    setIsLoading(true);
    centerThumbnail(index);
  };

  const centerThumbnail = (index: number) => {
    if (thumbnailGalleryRef.current) {
      const gallery = thumbnailGalleryRef.current;
      const thumbnail = gallery.children[index] as HTMLElement;
      const galleryWidth = gallery.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const scrollPosition = thumbnail.offsetLeft - (galleryWidth - thumbnailWidth) / 2;
      gallery.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.GalleryCarouselCompo}>
      {/* Gallery grid: use ResponsiveImage for each thumbnail */}
      <div className={styles.galleryGrid}>
        {images.map((image, index) => (
          <div key={index} onClick={() => { if (displaySize.isDesktop) openCarousel(index); }}>
            <ResponsiveImage
              imageData={image.imageData}
              alt={image.alt}
              lazyLoad={true}
              sizes="(max-width: 600px) 100vw, 600px"
              className={styles.galleryImage}
            />
          </div>
        ))}
      </div>

      {displaySize.isDesktop && (
        <Modal
          closeBtnClass={styles.modalCloseBtn}
          className={styles.galleryModal}
          isModalOpen={isCarouselOpen}
          setIsModalOpen={setCarouselOpen}
          closeBtnText="Close"
        >
          <div className={styles.carouselWrapper}>
            <div className={styles.mainImageWrapper}>
              {/* Animate the main image */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {selectedImage !== null ? (
                  <motion.div
                    key={selectedImage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveImage
                      imageData={images[selectedImage].imageData}
                      alt={images[selectedImage].alt}
                      lazyLoad={false}
                      sizes="(max-width: 800px) 100vw, 800px"
                      className={styles.mainImage}
                      onLoad={() => setIsLoading(false)}
                    />
                  </motion.div>
                ) : <></>}
              </AnimatePresence>
              {isLoading && (<CircleLoader size="medium" />)}
              <button onClick={prevImage} className={styles.prevButton}>
                <FaChevronLeft />
              </button>
              <button onClick={nextImage} className={styles.nextButton}>
                <FaChevronRight />
              </button>
            </div>

            {/* Thumbnail gallery: using ResponsiveImage for consistency */}
            <div className={styles.thumbnailGallery} ref={thumbnailGalleryRef}>
              {images.map((image, index) => (
                <div key={index} onClick={() => setCurrentImage(index)}>


                  <ResponsiveImage
                    imageData={image.imageData}
                    alt={image.alt}
                    lazyLoad={true}
                    sizes="(max-width: 200px) 100vw, 200px"
                    className={`${styles.thumbnailImage} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GalleryCarousel;