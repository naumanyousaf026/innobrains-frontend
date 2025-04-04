import React from 'react';

const TechSolutionsSection = () => {
  return (
    <section className='bg-[#F6F6F6]' >
     <div className="w-5/6 mx-auto py-16">
       {/* Main Title Section */}
       <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mx-8">
          Empowering Businesses with Innovative
          <span className="text-[#103153]">  Tech Solutions</span>
        </h1>
        <p className="text-lg md:text-xl text-[#5C5C5C] mt-4">
          Explain what your company is working on and the value you provide to your customers.
        </p>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row  mt-14 justify-between">
  {/* Left Side (Heading & Story) */}
  <div className=" ms-20 ">
    <h2 className="text-3xl md:text-xl  font-bold">
      About Us
    </h2>
    <h3 className="text-2xl md:text-4xl font-semibold mt-2">
      Our Story
    </h3>
  </div>

  {/* Right Side (Paragraph) */}
  <div className="md:w-[65%]">
    <p className="text-[#5C5C5C] mt-4 leading-relaxed">
     
Innobrains Technology is a leading-edge software house committed to delivering smart, scalable, and high-performance digital solutions. We specialize in full-stack development, UI/UX design, mobile apps, cloud integration, and custom enterprise software. Our goal is to transform businesses through innovative tech and creative strategies that drive results.

Our team of passionate developers, designers, and tech experts work collaboratively to ensure every project exceeds expectations. Whether you're a startup or a well-established company, we provide tailored IT solutions that align with your vision. At Innobrains, we believe in transparency, quality, and timely delivery—making us your ideal tech partner.
      {/* Add more actual content here as needed */}
    </p>
  </div>
</div>
     </div>
    </section>
  );
};

export default TechSolutionsSection;
