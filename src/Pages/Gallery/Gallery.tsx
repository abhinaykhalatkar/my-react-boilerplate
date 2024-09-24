import React from 'react';
import styles from './Gallery.module.scss';
import ComponentContainer from '../../Components/ComponentContainer/ComponentContainer';
import GalleryCarousel from '../../Components/GalleryCarousel/GalleryCarousel';
import galleryImg1 from '../../Assets/placeholderImage/image1.jpeg'
import galleryImg2 from '../../Assets/placeholderImage/image2.jpeg'
import galleryImg3 from '../../Assets/placeholderImage/image3.jpeg'
import galleryImg4 from '../../Assets/placeholderImage/image4.jpeg'
import galleryImg5 from '../../Assets/placeholderImage/image5.jpeg'
import galleryImg6 from '../../Assets/placeholderImage/image6.jpeg'
import galleryImg7 from '../../Assets/placeholderImage/image7.jpeg'
import galleryImg8 from '../../Assets/placeholderImage/image8.jpeg'
import galleryImg9 from '../../Assets/placeholderImage/image9.jpeg'
import galleryImg10 from '../../Assets/placeholderImage/image10.jpeg'
import galleryImg11 from '../../Assets/placeholderImage/image11.jpeg'
import galleryImg12 from '../../Assets/placeholderImage/image12.jpeg'
import galleryImg13 from '../../Assets/placeholderImage/image13.jpeg'
import galleryImg14 from '../../Assets/placeholderImage/image14.jpeg'
import galleryImg15 from '../../Assets/placeholderImage/image15.jpeg'
import galleryImg16 from '../../Assets/placeholderImage/image16.jpeg'
import galleryImg17 from '../../Assets/placeholderImage/image17.jpeg'
import galleryImg18 from '../../Assets/placeholderImage/image18.jpeg'
import galleryImg19 from '../../Assets/placeholderImage/image19.jpeg'
import galleryImg20 from '../../Assets/placeholderImage/image20.jpeg'

const images = [
    { src: galleryImg1, alt: 'gallery image' },
    { src: galleryImg2, alt: 'gallery image' },
    { src: galleryImg3, alt: 'gallery image' },
    { src: galleryImg4, alt: 'gallery image' },
    { src: galleryImg5, alt: 'gallery image' },
    { src: galleryImg6, alt: 'gallery image' },
    { src: galleryImg7, alt: 'gallery image' },
    { src: galleryImg8, alt: 'gallery image' },
    { src: galleryImg9, alt: 'gallery image' },
    { src: galleryImg19, alt: 'gallery image' },
    { src: galleryImg20, alt: 'gallery image' },
    { src: galleryImg10, alt: 'gallery image' },
    { src: galleryImg11, alt: 'gallery image' },
    { src: galleryImg12, alt: 'gallery image' },
    { src: galleryImg13, alt: 'gallery image' },
    { src: galleryImg14, alt: 'gallery image' },
    { src: galleryImg15, alt: 'gallery image' },
    { src: galleryImg16, alt: 'gallery image' },
    { src: galleryImg17, alt: 'gallery image' },
    { src: galleryImg18, alt: 'gallery image' },

];

const Gallery: React.FC = () => {
    return (

        <ComponentContainer containerClassName={`container ${styles.Gallery}`} heading='Gallery'>
            <>
            <GalleryCarousel images={images}/>
            </>
        </ComponentContainer>

    );
};

export default Gallery;