import React from "react";

const ServicesSection = () => {
  return (
    <div className="relative">
      {/* Section 1: Light Blue Background with Waves */}
      <div className="bg-[#E5F6FF] relative pb-40">
        {/* Top Wave */}
        <div className="absolute inset-x-0 top-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L30,192C60,192,120,192,180,176C240,160,300,128,360,122.7C420,117,480,139,540,144C600,149,660,139,720,122.7C780,107,840,85,900,106.7C960,128,1020,192,1080,197.3C1140,203,1200,149,1260,144C1320,139,1380,181,1410,202.7L1440,224L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Content */}
        <div className="container mx-auto text-center px-6 pt-32">
          <h1 className="text-5xl font-bold text-gray-900">
            We Provide A Wide Range Of Services
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            We strive for creative and manufacturing synergy, utilizing each
            team member's individual skills and unique perspective on design,
            collaborating to achieve exceptional results.
          </p>
          <button className="mt-8 bg-[#FFA500] text-white py-3 px-8 rounded-full text-lg hover:bg-yellow-600">
            Contact Us
          </button>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-12 text-gray-800">
            <div>
              <h2 className="text-5xl font-bold">800</h2>
              <p className="text-lg">Loyal Clients</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold">30</h2>
              <p className="text-lg">Experts</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold">5</h2>
              <p className="text-lg">Years of Experience</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold">5</h2>
              <p className="text-lg">Tech Awards</p>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
      
      </div>

      {/* Section 2: Dark Blue with Testimonials */}
      <div className="bg-[#0E213D] text-white relative py-32 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our Satisfied Customers
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-center">
          <div>
            <p className="italic text-lg">
              "We've worked with them for start-up tech consultancy, and the
              level of support has been just great. We have been particularly
              happy with the active and professional development team. I would
              warmly recommend them."
            </p>
            <p className="mt-6 font-bold text-xl">JASON KEATH</p>
          </div>
          <div>
            <p className="italic text-lg">
              "What we appreciated most about working with Innobrains and his
              team was their ability to cut through the predictable problems of
              a project, keep everyone happy, and deliver the expected results."
            </p>
            <p className="mt-6 font-bold text-xl">Umer Farooq</p>
          </div>
        </div>

        {/* Bottom Wave for Testimonials */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#E5F6FF"
              fillOpacity="1"
              d="M0,224L30,202.7C60,181,120,139,180,138.7C240,139,300,181,360,181.3C420,181,480,139,540,122.7C600,107,660,117,720,144C780,171,840,213,900,218.7C960,224,1020,192,1080,170.7C1140,149,1200,139,1260,160C1320,181,1380,235,1410,261.3L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
