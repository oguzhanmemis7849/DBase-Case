import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const length = images.length;
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [current, isDragging]);

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === length - 1 ? 0 : prevCurrent + 1
    );
    resetTranslate();
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? length - 1 : prevCurrent - 1
    );
    resetTranslate();
  };

  const resetTranslate = () => {
    setPrevTranslate(0);
    setCurrentTranslate(0);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const currentX = e.clientX;
      const newTranslate = prevTranslate + currentX - startX;
      setCurrentTranslate(newTranslate);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) {
      nextSlide();
    } else if (movedBy > 100) {
      prevSlide();
    } else {
      setCurrentTranslate(prevTranslate); // Snap back to original position
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseLeave={handleDragEnd}
      onMouseUp={handleDragEnd}
      ref={sliderRef}
      role="button"
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${currentTranslate - current * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-96">
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-fill"
              draggable="false"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
      >
        &gt;
      </button>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageSlider;
