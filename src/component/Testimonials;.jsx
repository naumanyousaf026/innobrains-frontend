import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 my-10 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl poppins-thin font-semibold tracking-wide mb-16">Our Satisfied Customers</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 text-left">
        {/* Testimonial 1 */}
        <div className="flex flex-col">
          <p className="text-gray-700 mb-8 poppins-thin  tracking-wide text-lg leading-relaxed">
            We've worked with them for start-up tech consultancy, and the level of support we have received has been just great.
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl poppins-thin">JASON KEATH</p>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
              <FaStarHalfAlt className="text-yellow-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="flex flex-col">
          <p className="text-gray-700 mb-8 poppins-thin text-lg  tracking-wide leading-relaxed">
            What we appreciated most about working with Innobrains and his team was their ability to cut through the predictable problems.
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl poppins-thin ">Umer Farooq</p>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
              <FaStarHalfAlt className="text-yellow-400 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;