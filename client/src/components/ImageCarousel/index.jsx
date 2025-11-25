import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.css';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  if (!images || images.length === 0) {
    return <div className="image-carousel__placeholder">Нет фото</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="image-carousel">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="image-carousel__image"
      />

      {images.length > 1 && (
        <>
          <button
            className="image-carousel__btn image-carousel__btn--prev"
            onClick={prevSlide}
            aria-label="Предыдущее фото"
          >
            &lt;
          </button>

          <button
            className="image-carousel__btn image-carousel__btn--next"
            onClick={nextSlide}
            aria-label="Следующее фото"
          >
            &gt;
          </button>

          <div className="image-carousel__dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`image-carousel__dot ${idx === currentIndex ? 'image-carousel__dot--active' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default ImageCarousel;