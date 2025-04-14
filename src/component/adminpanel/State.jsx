import React, { useState } from "react";

export default function StatePreview() {
  const [data, setData] = useState({
    headline: "Empowering Innovations",
    description:
      "At Innobrains Technologies, we provide cutting-edge software solutions that drive growth and success for our clients across industries.",
    loyalClients: "150+",
    experts: "25",
    yearsExperience: "10",
    techAwards: "8",
  });

  const handleDelete = () => {
    setData(null);
  };

  const handleAdd = () => {
    setData({
      headline: "Empowering Innovations",
      description:
        "At Innobrains Technologies, we provide cutting-edge software solutions that drive growth and success for our clients across industries.",
      loyalClients: "150+",
      experts: "25",
      yearsExperience: "10",
      techAwards: "8",
    });
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="mb-4 text-lg">
          No data available. Please click{" "}
          <span className="font-semibold">Add</span> to view preview.
        </p>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2  transition duration-300"
        >
          Add
        </button>
      </div>
    );
  }

  return (
    <div className="w-[80%] ml-auto  justify-center items-center p-6">
           <button
            onClick={handleAdd}
            class="bg-[#103153] ms-auto block nunito-sans my-4 text-white px-9 font-semibold py-3 rounded-md shadow-md transition duration-300"
          >
           Update Content
          </button>
      <div className="w-full bg-white rounded-xl  p-8 border border-gray-300 flex flex-col justify-between">
        <h2 className="text-3xl font-bold  text-center mb-10">
          Company Profile Preview
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold  text-center nunito-sans text-gray-700 mb-2">Headline</h3>
          <p className="text-gray-800 text-center  nunito-sans text-lg">{data.headline}</p>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold   nunito-sans text-gray-700 mb-2">Description</h3>
          <p className="text-gray-800 leading-relaxed">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Loyal Clients", value: data.loyalClients },
            { label: "Experts", value: data.experts },
            { label: "Years Experience", value: data.yearsExperience },
            { label: "Tech Awards", value: data.techAwards },
          ].map(({ label, value }) => (
            <div
              key={label}
              className=" bg-red-500 rounded-xl p-6 text-center shadow-md "
            >
              <h4 className="text-sm  nunito-sans font-medium uppercase tracking-wider mb-2">
                {label}
              </h4>
              <p className="text-2xl  nunito-sans font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4">
       
          <button
            onClick={handleDelete}
            className="bg-red-500 w-[25%] mx-auto nunito-sans hover:bg-red-600 text-white px-9 font-semibold  py-3 rounded-md  shadow-md transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}