import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [satisfactionData, setSatisfactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/satisfie");
        setSatisfactionData(response.data);
      } catch (error) {
        console.error("Error fetching satisfaction data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 my-10 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl poppins-thin font-semibold tracking-wide mb-16">Our Satisfied Customers</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 text-left">
        {satisfactionData.length > 0 ? (
          satisfactionData.map((entry) => (
            <div key={entry._id} className="flex flex-col">
              <p className="text-gray-700 mb-8 poppins-thin tracking-wide text-lg leading-relaxed">
                {entry.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xl poppins-thin">{entry.customerName}</p>
                <div className="flex space-x-1">
                  {[...Array(Math.floor(entry.rating || 4))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-2xl" />
                  ))}
                  {entry.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400 text-2xl" />}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading testimonials...</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
