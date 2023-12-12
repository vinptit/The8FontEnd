// Carousel.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 5) % 5);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Carousel items */}
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`${
              currentSlide === index - 1 ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <img
              src={`./images/carousel/carousel-${index}.jpg`}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(5).keys()].map((index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            aria-current={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={goToPrevSlide}
      >
        {/* Previous button content */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={goToNextSlide}
      >
        {/* Next button content */}
      </button>
    </div>
  );
};

export default Carousel;
