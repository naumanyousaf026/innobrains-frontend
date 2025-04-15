import { useState } from "react";
import TechSolutionsSection from "../aboutus/TechSection";
export default function AboutPreview() {
  const [data, setData] = useState({
    title: "Welcome to Innobrains",
    description:
      "We specialize in software solutions that revolutionize businesses worldwide.",
    aboutTitle: "About Innobrains",
    aboutDescription:
      "Innobrains Technologies is dedicated to delivering innovation and excellence in every project. Our team of experts ensures client success through customized solutions.",
  });

  const handleDelete = () => {
    setData(null);
  };

  const handleAdd = () => {
    setData({
      title: "Welcome to Innobrains",
      description:
        "We specialize in software solutions that revolutionize businesses worldwide.",
      aboutTitle: "About Innobrains",
      aboutDescription:
        "Innobrains Technologies is dedicated to delivering innovation and excellence in every project. Our team of experts ensures client success through customized solutions.",
    });
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="mb-4 text-lg">
          No data available. Please click <span className="font-semibold">Add</span> to view preview.
        </p>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition duration-300"
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
            className="bg-[#103153] nunito-sans block my-4 ms-auto text-white px-9 font-semibold py-3 rounded-md shadow-md transition duration-300"
          >
            Update Content
          </button>
      <div className="w-full bg-white rounded-xl p-8 border border-gray-300 flex flex-col justify-between">
      
  <TechSolutionsSection/>
        <div className="flex justify-between ">
        
          <button
            onClick={handleDelete}
            className="bg-red-500 mx-auto w-[25%] nunito-sans hover:bg-red-600 text-white px-9 font-semibold py-3 rounded-md shadow-md transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}