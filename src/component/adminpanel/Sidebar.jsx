import React from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
  TrophyIcon,
  PhoneIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

// Main button with sub-buttons always displayed
const FormsButton = ({ setSection }) => {
  return (
    <div className="flex flex-col ml-3 gap-2">
      <button
        onClick={() => setSection("AchievementForm")}
        className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
      >
        <TrophyIcon className="h-6 w-6" />
        Achievement
      </button>
      <button
        onClick={() => setSection("ContactInfoForm")}
        className="flex items-center gap-2 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
      >
        <PhoneIcon className="h-6 w-6" />
        InfoForm
      </button>
      <button
        onClick={() => setSection("StepForm")}
        className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
      >
        <ChartBarIcon className="h-6 w-6" />
        GrowthStep
      </button>
    </div>
  );
};

const Sidebar = ({ setSection, handleLogout, isOpen }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-100 p-4 z-20 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:w-[20%]`}
    >
      <div className="mb-8">
        <img
          src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
          alt="Logo"
          className="w-40 mx-auto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setSection("dashboard")}
          className="flex items-center gap-2 ml-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
        >
          <HomeIcon className="h-6 w-6" />
          Dashboard
        </button>
        <button
          onClick={() => setSection("products")}
          className="flex items-center gap-2 ml-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          Products
        </button>
        <button
          onClick={() => setSection("services")}
          className="flex items-center gap-2 ml-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
        >
          <BriefcaseIcon className="h-6 w-6" />
          Services
        </button>
        <button
          onClick={() => setSection("blogs")}
          className="flex items-center gap-2 ml-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
        >
          <NewspaperIcon className="h-6 w-6" />
          Blogs
        </button>
        <button
          onClick={() => setSection("team")}
          className="flex items-center gap-2 ml-3 p-2 text-lg font-medium hover:bg-[#103153] hover:text-white rounded-md"
        >
          <UserGroupIcon className="h-6 w-6" />
          Team
        </button>

        {/* Form buttons are always visible with consistent size and alignment */}
        <FormsButton setSection={setSection} />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-5 ml-3 p-2 mt-10 text-lg font-medium text-red-600 hover:bg-[#103153] hover:text-white rounded-md"
        >
          <FontAwesomeIcon icon={faPowerOff} className="h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
