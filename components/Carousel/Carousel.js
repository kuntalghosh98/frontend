// components/Carousel/Carousel.js

import React, { useEffect, useRef, useState } from 'react';
import CarouselItem from './CarouselItem';


const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const itemWidth = carousel.children[0].offsetWidth;
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      // Reset to first item after reaching the last item
      if (currentIndex === items.length) {
        setTimeout(() => {
          setCurrentIndex(0);
          carousel.style.transition = 'none';
          carousel.style.transform = `translateX(0)`;
        }, 500); // Adjust timing based on transition duration
      }
    }
  }, [currentIndex, items.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-inner  py-4" ref={carouselRef}>
        {items.map((item, index) => (
          <CarouselItem key={index} imageUrl={item.imageUrl} route={item.route} />
        ))}
        {/* Duplicate the first item for seamless transition */}
        <CarouselItem imageUrl={items[0].imageUrl} route={items[0].route} />
      </div>
      <div className="carousel-indicators ">
        {items.map((_, index) => (
          <div
            key={index}
            className={`indicator  ${currentIndex % items.length === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
