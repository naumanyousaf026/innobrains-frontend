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
    <div className="w-full h-full p-0 m-0">
      <div className="w-full max-w-2xl bg-white rounded-lg p-4 border border-gray-300 shadow-md mt-0">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center text-black hover:text-gray-700 transition duration-300 mb-2"
        >
          <IoArrowBackSharp className="text-lg mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
          Stats Section Form
        </h2>

        {loading && <p className="text-center text-gray-600 text-sm">Loading...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-3">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-sm mb-3">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Headline */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              placeholder="Enter your headline"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="2"
              placeholder="Enter a brief description about your company"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Loyal Clients", name: "loyalClients", placeholder: "Number of clients" },
              { label: "Experts", name: "experts", placeholder: "Number of experts" },
              { label: "Years of Experience", name: "yearsExperience", placeholder: "Years" },
              { label: "Tech Awards", name: "techAwards", placeholder: "Number of awards" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-gray-700 text-sm font-medium">
                  {label}
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded mt-1 px-2 py-1 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#103153] text-white font-medium py-2 rounded text-sm"
            >
              {loading ? "Saving..." : existingStats ? "Update Stats" : "Create Stats"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}