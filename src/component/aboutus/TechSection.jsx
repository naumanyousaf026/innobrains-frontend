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
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores consectetur eveniet libero, perspiciatis beatae voluptate, illo exercitationem assumenda ab explicabo culpa doloremque. A quae, non ad velit tempore fuga sapiente dolorum praesentium omnis nobis cumque iste recusandae quidem. Nam cumque consectetur ab ipsam, ipsa neque dolores numquam assumenda quas laudantium aliquam ullam mollitia laboriosam! Doloremque incidunt iusto laborum error explicabo impedit distinctio tempore, repellat laboriosam repudiandae quis molestiae debitis non maxime. A odio ipsa sequi explicabo quas? Voluptatem consectetur delectus architecto, possimus, consequuntur laudantium unde temporibus atque officia culpa magni aliquid assumenda. Vero facilis ratione eaque porro ipsa necessitatibus sunt.
      {/* Add more actual content here as needed */}
    </p>
  </div>
</div>
     </div>
    </section>
  );
};

export default TechSolutionsSection;
