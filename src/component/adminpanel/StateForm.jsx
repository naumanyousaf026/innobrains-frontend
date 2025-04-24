import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";

export default function StatsForm({ onClose }) {
  const [formData, setFormData] = useState({
    headline: "",
    description: "",
    loyalClients: "",
    experts: "",
    yearsExperience: "",
    techAwards: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [existingStats, setExistingStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://apis.innobrains.pk/api/stats");
        if (response.data && response.data.length > 0) {
          const stats = response.data[0];
          setExistingStats(stats);
          setFormData({
            headline: stats.headline || "",
            description: stats.description || "",
            loyalClients: stats.loyalClients || "",
            experts: stats.experts || "",
            yearsExperience: stats.yearsExperience || "",
            techAwards: stats.techAwards || "",
          });
        }
      } catch (err) {
        setError("Failed to fetch existing stats. You may be creating new stats.");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "headline" || name === "description" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (existingStats) {
        const response = await axios.put(
          `https://apis.innobrains.pk/api/stats/${existingStats._id}`,
          formData
        );
        setSuccess("Stats updated successfully!");
        console.log("Updated stats:", response.data);
      } else {
        const response = await axios.post(
          "https://apis.innobrains.pk/api/stats",
          formData
        );
        setExistingStats(response.data);
        setSuccess("Stats created successfully!");
        console.log("Created stats:", response.data);
      }
    } catch (err) {
      setError(`Failed to ${existingStats ? "update" : "create"} stats. Please try again.`);
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-0 m-0">
      <div className=" w-[80%] ml-auto bg-white rounded-xl p-6 border border-gray-300 shadow-lg my-4">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center text-black hover:text-gray-700 transition duration-300 mb-4"
        >
          <IoArrowBackSharp className="text-xl mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-2xl nunito-sans font-bold text-gray-800 mb-4 text-center">
          Stats Section Form
        </h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Headline */}
          <div>
            <label className="block text-gray-700 nunito-sans font-medium mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              placeholder="Enter your headline"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block nunito-sans text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Enter a brief description about your company"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Loyal Clients", name: "loyalClients", placeholder: "Enter number of clients" },
              { label: "Experts", name: "experts", placeholder: "Enter number of experts" },
              { label: "Years of Experience", name: "yearsExperience", placeholder: "Enter number of years" },
              { label: "Tech Awards", name: "techAwards", placeholder: "Enter number of awards" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium nunito-sans">
                  {label}
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-md mt-1 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#103153] text-white font-semibold py-2 nunito-sans rounded-md transition-all duration-300 hover:bg-[#0c2641] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : existingStats ? "Update Stats" : "Create Stats"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}