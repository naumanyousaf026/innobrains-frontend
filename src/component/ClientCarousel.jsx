
import React from 'react';
import logo1 from '../images/logo1.jpeg';
import logo2 from '../images/logo2.jpeg';
import logo3 from '../images/logo3.jpeg';
import logo4 from '../images/logo4.jpeg';

const  ClientCarousel = () => {
  const logos = [
    { src: logo1, alt: 'Client 1' },
    { src: logo2, alt: 'Client 2' },
    { src: logo3, alt: 'Client 3' },
    { src: logo4, alt: 'Client 4' },

  ];

  return (
    <div className="py-8 bg-[#DCEDFF] my-[34px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[70px]">
        <h2 className="text-center text-black text-xl font-semibold mb-6">Our Satisfied Clients</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center p-4">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto object-contain md:h-12 lg:h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default  ClientCarousel;