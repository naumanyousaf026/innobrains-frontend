import React, { useEffect, useState } from "react";
import axios from "axios";
import achiev from "../../images/download.png";

const Achievements = () => {
  const [achievementData, setAchievementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "https://apis.innobrains.pk/api/achievements"
        );
        console.log(response.data); // Log the response to check structure
        if (response.data.length > 0) {
          setAchievementData(response.data[0]); // Set the first achievement
        } else {
          setError("No achievements found.");
        }
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError("Error fetching achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!achievementData) return <p>No achievements found.</p>;

  return (
    <div className="bg-[#F6F6F6]">
      <div className="w-5/6 mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {achievementData.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              {achievementData.description}
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold">
                  {achievementData.projectsCompleted || "N/A"}
                </h3>
                <p className="mt-2">Projects completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">
                  {achievementData.yearOnYearGrowth || "N/A"}
                </h3>
                <p className="mt-2">Year on year growth</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">
                  {achievementData.funded || "N/A"}
                </h3>
                <p className="mt-2">Funded</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">
                  {achievementData.downloads || "N/A"}
                </h3>
                <p className="mt-2">Downloads</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={achiev}
              alt="Teamwork"
              className="w-[75%] h-[30rem] ms-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
