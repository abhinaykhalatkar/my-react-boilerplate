import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GalleryCarousel.module.scss';
import Modal from '../Modal/Modal';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { AccessibilityContext } from '../../Context/accessibilityContext';

interface ImageProps {
  src: string;
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
  const { displaySize } = useContext(AccessibilityContext);
  const thumbnailGalleryRef = useRef<HTMLDivElement>(null); // Ref for thumbnail gallery

  useEffect(() => {
    if (isCarouselOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

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

  const openCarousel = (index: number) => {
    setSelectedImage([index, 0]);
    setCarouselOpen(true);  
  };

  const nextImage = () => {
    const newIndex = (selectedImage + 1) % images.length;
    setSelectedImage([newIndex, 1]);
    console.log(newIndex)
    centerThumbnail(newIndex); // Ensure selected image is centered
  };

  const prevImage = () => {
    const newIndex = (selectedImage - 1 + images.length) % images.length;
    setSelectedImage([newIndex, -1]);
    console.log(newIndex)
    centerThumbnail(newIndex); // Ensure selected image is centered
  };

  const setCurrentImage = (index: number) => {
    setSelectedImage([index, 0]);
    centerThumbnail(index); // Ensure selected image is centered
  };

  // Center the selected thumbnail in the gallery
  const centerThumbnail = (index: number) => {
    if (thumbnailGalleryRef.current) {
      const gallery = thumbnailGalleryRef.current;
      const thumbnail = gallery.children[index] as HTMLElement;
      const galleryWidth = gallery.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const scrollPosition =thumbnail.offsetLeft - (galleryWidth - thumbnailWidth) /2;
      
      // Scroll to the calculated position
      gallery.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      console.log(scrollPosition)
    }
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
            onClick={() => { if (displaySize.isDesktop) { openCarousel(index)}  }}
          />
        ))}
      </div>

      {displaySize.isDesktop &&
        <Modal closeBtnClass={styles.modalCloseBtn} className={styles.galleryModal} isModalOpen={isCarouselOpen} setIsModalOpen={setCarouselOpen} closeBtnText="Close">
          <div className={styles.carouselWrapper}>
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

            {/* Infinite Scrolling Thumbnail Gallery */}
            <div className={styles.thumbnailGallery} ref={thumbnailGalleryRef}>
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
