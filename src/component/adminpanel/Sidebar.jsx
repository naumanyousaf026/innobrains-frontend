import React from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  WrenchScrewdriverIcon,
  NewspaperIcon,
  UsersIcon,
  TrophyIcon,
  PhoneIcon,
  ChartBarIcon,
  MapPinIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/solid";
// Import the logo image
import logoImage from "../images/innobrains.jpg";

const FormsButton = ({ setSection }) => {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <div className="pl-3 text-gray-500 text-sm font-semibold uppercase tracking-wider">
        Forms
      </div>
      <button
        onClick={() => setSection("AchievementForm")}
        className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
      >
        <TrophyIcon className="h-5 w-5" />
        Achievement
      </button>
      <button
        onClick={() => setSection("ContactInfoForm")}
        className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
      >
        <PhoneIcon className="h-5 w-5" />
        Contact Info
      </button>
      <button
        onClick={() => setSection("StepForm")}
        className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
      >
        <ArrowTrendingUpIcon className="h-5 w-5" />
        Growth Steps
      </button>
      <button
        onClick={() => setSection("AboutForm")}
        className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
      >
        <InformationCircleIcon className="h-5 w-5" />
        About Form
      </button>
    </div>
  );
};

const Sidebar = ({ setSection, handleLogout, isOpen }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg p-4 z-20 overflow-y-auto border-r border-gray-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64`}
    >
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img
          src={logoImage}
          alt="InnoBrains Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1">
        <div className="pl-3 text-gray-500 text-sm font-semibold uppercase tracking-wider">
          Main Navigation
        </div>
        <button
          onClick={() => setSection("dashboard")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </button>
        <button
          onClick={() => setSection("products")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          Products
        </button>
        <button
          onClick={() => setSection("services")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <WrenchScrewdriverIcon className="h-5 w-5" />
          Services
        </button>
        <button
          onClick={() => setSection("state")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <MapPinIcon className="h-5 w-5" />
          State
        </button>
        <button
          onClick={() => setSection("blogs")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <NewspaperIcon className="h-5 w-5" />
          Blogs
        </button>
        <button
          onClick={() => setSection("team")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <UsersIcon className="h-5 w-5" />
          Team
        </button>
        <button
          onClick={() => setSection("userSubmissions")}
          className="flex items-center gap-3 p-2 pl-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
        >
          <EnvelopeIcon className="h-5 w-5" />
          User Contacts
        </button>

        {/* Form Section */}
        <FormsButton setSection={setSection} />

        {/* Logout Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 p-2 pl-4 text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors"
          >
            <PowerIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;