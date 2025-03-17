import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import arhsid from "../../images/sir.png";

const Header = ({ setSidebarOpen, status }) => {
  const navigate = useNavigate();

  // State to hold notifications and whether the dropdown is visible
  const [notifications, setNotifications] = useState([
    "New item added!",
    "Item updated successfully!",
    "New message received!",
  ]);
  const [showNotifications, setShowNotifications] = useState(false); // Toggle for notification dropdown

  // Function to handle notification click
  const handleBellClick = () => {
    setShowNotifications((prev) => !prev); // Toggle the notification dropdown visibility
  };

  // Function to navigate to the profile page
  const goToProfile = () => {
    navigate("/ProfilePage");
  };

  // Function to fetch or update notifications based on status
  useEffect(() => {
    if (status === 1) {
      // Display notifications when status is 1
      setNotifications([
        "New item added!",
        "Item updated successfully!",
        "New message received!",
      ]);
    } else {
      // Do not show notifications when status is 0
      setNotifications([]);
    }
  }, [status]);

  return (
    <div className="lg:w-[81%] bg-white p-4 shadow-md flex ml-auto justify-between items-center">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div className="flex gap-2 max-w-lg">
        <div className="flex items-center border rounded-md w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="border-none p-2 w-full focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Bell icon with notification count */}
        <div className="relative">
          <button onClick={handleBellClick}>
            <BellIcon className="h-8 w-8 text-gray-700" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-md w-48 p-2">
              <ul>
                {notifications.length === 0 ? (
                  <li className="text-sm py-1 px-2 text-gray-500">
                    No notifications
                  </li>
                ) : (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="text-sm py-1 px-2 hover:bg-gray-200"
                    >
                      {notification}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile icon */}
        <div onClick={goToProfile} style={{ cursor: "pointer" }}>
          <img src={arhsid} alt="User" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
