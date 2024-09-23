import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GalleryCarousel.module.scss'; // SCSS module
import Modal from '../Modal/Modal'; // Import Modal
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { AccessibilityContext } from '../../Context/accessibilityContext';

// Define image interface
interface ImageProps {
  src: string;
  alt: string;
}

// Props for the gallery carousel
interface GalleryCarouselProps {
  images: ImageProps[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "0%",  // Slide in from left or right
    opacity: 0,  // Start with invisible
  }),
  center: {
    zIndex: 1,  // Ensure the centered image is on top
    x: 0,       // Centered in the viewport
    opacity: 1, // Fully visible
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 90 }, // Smooth spring-like sliding transition
      opacity: { duration: 0.5 },  // Opacity fades in over 0.5s
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,  // Move behind the incoming image
    x: direction < 0 ? "0%" : "-100%",  // Slide out to the left or right
    opacity: 0,  // Fade out to invisible
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 }, // Smooth exit slide
      opacity: { duration: 0.5 },  // Opacity fades out over 0.5s
    },
  }),
};


const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [[selectedImage, direction], setSelectedImage] = useState([0, 0]);
  const { displaySize } =
    useContext(AccessibilityContext);

  useEffect(() => {
    if (isCarouselOpen) {
      // Disable background scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable background scroll
      document.body.style.overflow = '';
    }

    // Handle mouse scroll for navigation
    const handleScroll = (e: WheelEvent) => {
      if (isCarouselOpen) {
        if (e.deltaY > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isCarouselOpen, selectedImage]);

  // Open the carousel
  const openCarousel = (index: number) => {
    setSelectedImage([index, 0]);
    setCarouselOpen(true);
  };
  // Go to next image
  const nextImage = () => {
    setSelectedImage([selectedImage + 1 < images.length ? selectedImage + 1 : 0, 1]);
  };

  // Go to previous image
  const prevImage = () => {
    setSelectedImage([selectedImage - 1 >= 0 ? selectedImage - 1 : images.length - 1, -1]);
  };

  // Set image from thumbnail gallery
  const setCurrentImage = (index: number) => {
    setSelectedImage([index, 0]);
  };

  return (
    <div className={styles.GalleryCarouselCompo}>
      
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={styles.galleryImage}
              onClick={() => { if(displaySize.isDesktop){openCarousel(index)}}}
            />
          ))}
        </div>
  


      {displaySize.isDesktop  &&
        <Modal closeBtnClass={styles.modalCloseBtn} className={styles.galleryModal} isModalOpen={isCarouselOpen} setIsModalOpen={setCarouselOpen} closeBtnText="Close">
          <div className={styles.carouselWrapper}>
            {/* Main Image with animation */}
            <div className={styles.mainImageWrapper}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className={styles.mainImage}
                />
              </AnimatePresence>
              <button onClick={prevImage} className={styles.prevButton}>
                <FaChevronLeft />
              </button>
              <button onClick={nextImage} className={styles.nextButton}>
                <FaChevronRight />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className={styles.thumbnailGallery}>
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`${styles.thumbnailImage} ${selectedImage === index ? styles.activeThumbnail : ''
                    }`}
                  onClick={() => setCurrentImage(index)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </Modal>}
    </div>
  );
};

export default GalleryCarousel;
