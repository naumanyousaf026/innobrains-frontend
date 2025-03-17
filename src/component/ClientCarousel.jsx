import React, { useState } from 'react';
import logo1 from '../images/logo1.jpeg';
import logo2 from '../images/logo2.jpeg';
import logo3 from '../images/logo3.jpeg';
import logo4 from '../images/logo4.jpeg';

const ClientCarousel = () => {
  const logos = [
    { src: logo1, alt: 'Client 1' },
    { src: logo2, alt: 'Client 2' },
    { src: logo3, alt: 'Client 3' },
    { src: logo4, alt: 'Client 4' },
    { src: logo1, alt: 'Client 1' },
    { src: logo2, alt: 'Client 2' },
    { src: logo3, alt: 'Client 3' },
    { src: logo4, alt: 'Client 4' },
  ];

  const logosPerSlide = 4;
  const totalSlides = Math.ceil(logos.length / logosPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-8 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-center text-white text-xl font-semibold mb-6">Our Satisfied Clients</h2>
        
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 ml-4 text-white focus:outline-none top-1/2 transform -translate-y-1/2 z-10"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Client Logos */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`, width: `${totalSlides * 100}%` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {logos.slice(
                    slideIndex * logosPerSlide,
                    slideIndex * logosPerSlide + logosPerSlide
                  ).map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-1/4 flex justify-center items-center p-4">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 mr-4 text-white focus:outline-none top-1/2 transform -translate-y-1/2 z-10"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
