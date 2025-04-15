import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wave = () => {
  const [statsData, setStatsData] = useState({
    headline: "We Provide A Wide Range Of Services",
    description: "We strive for creative and manufacturing synergy, utilizing each team member's individual skills and own unique perspective on design, collaborating to achieve exceptional results.",
    loyalClients: 800,
    experts: 30,
    yearsExperience: 5,
    techAwards: 5
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/stats");
        if (response.data && response.data.length > 0) {
          setStatsData(response.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats data:", error);
        setLoading(false);
      }
    };
    
    fetchStatsData();
  }, []);

  return (
    <section className="bg-[#103153] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[70px] grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side Content */}
        <div>
          <h2 className="text-3xl md:text-4xl tracking-wide font-bold mb-4">
            {statsData.headline.split(' ').slice(0, 3).join(' ')} <br />
            {statsData.headline.split(' ').slice(3, 5).join(' ')} <br />
            {statsData.headline.split(' ').slice(5).join(' ')}
          </h2>
          <p className="text-gray-300 mb-6">
            {statsData.description}
          </p>
          <Link to="/contact">
            <button className="bg-[#F8AF2A] text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Right Side Stats */}
        <div className="grid grid-cols-2 gap-8 md:text-center">
          <div>
            <p className="text-4xl font-bold">{statsData.loyalClients}</p>
            <p className="text-gray-300">Loyal Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{statsData.experts}</p>
            <p className="text-gray-300">Experts</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{statsData.yearsExperience}</p>
            <p className="text-gray-300">Years Of Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{statsData.techAwards}</p>
            <p className="text-gray-300">Tech Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wave;