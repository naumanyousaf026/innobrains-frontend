import { useState } from "react";

export default function StateForm() {
  const [formData, setFormData] = useState({
    headline: "",
    description: "",
    loyalClients: "",
    experts: "",
    yearsExperience: "",
    techAwards: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="w-[80%] ml-auto flex justify-center items-center p-6">
      <div className="w-full bg-white rounded-xl  p-8 border border-gray-300 flex flex-col justify-between">
        <h2 className="text-3xl nunito-sans font-extrabold text-gray-800 mb-5 text-center">
          Company Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex-grow space-y-6">
          {/* Headline */}
          <div>
            <label className="block text-gray-700 nunito-sans font-medium mb-2">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              placeholder="Enter your headline"
              className="w-full border border-gray-300 rounded-lg px-4 py-3  text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block nunito-sans text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter a brief description about your company"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </form>

        {/* Stats Section Fixed at the Bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-6 ">
          {[ 
            { label: "Loyal Clients", name: "loyalClients", placeholder: "Enter number of clients" },
            { label: "Experts", name: "experts", placeholder: "Enter number of experts" },
            { label: "Years of Experience", name: "yearsExperience", placeholder: "Enter number of years" },
            { label: "Tech Awards", name: "techAwards", placeholder: "Enter number of awards" },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="  rounded-xl ">
              <label className="block text-gray-700 font-semibold nunito-sans  text-lg">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md mt-2 px-4 py-2  text-gray-800 placeholder:text-gray-400"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#103153]  text-white font-semibold py-2 nunito-sans rounded-md  transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
}