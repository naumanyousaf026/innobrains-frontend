import React from "react";
import Notfound from "../../images/404.png";
function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2a46] font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* 404 Image */}
        <div className="mb-6">
          <img src={Notfound} alt="404 Error" className="mx-auto w-72" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold mb-2 nunito-sans">
          Looks like you’ve got lost….
        </h2>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-72 nunito-sans bg-[#103153] text-white py-2 rounded-lg transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
export default PageNotFound;
