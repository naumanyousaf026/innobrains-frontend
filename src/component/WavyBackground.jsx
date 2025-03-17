import React from 'react';

const WavyBackground = () => {
  return (
    <div className="relative w-full h-screen bg-blue-900">
      <svg
        className="absolute top-0 left-0 w-full h-64"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#173D5B"
          fillOpacity="1"
          d="M0,64L60,74.7C120,85,240,107,360,138.7C480,171,600,213,720,213.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default WavyBackground;
