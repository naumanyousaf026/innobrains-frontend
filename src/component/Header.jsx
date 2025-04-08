import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importing App.css

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBlogSubmenu, setShowBlogSubmenu] = useState(false); // State for controlling submenu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleBlogSubmenu = () => {
    setShowBlogSubmenu(!showBlogSubmenu); // Toggle submenu on click
  };

  return (
    <nav className="bg-[linear-gradient(89.27deg,#F7F7F7_62.4%,#103153_441.03%)] drop-shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 md:px-[44px] relative">
          {/* Left navigation */}
          <ul className="items-center space-x-6 header_items font-semibold hidden text-gray-800 md:flex">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/services'>Services</Link></li>
            <li 
              className="relative"
              onClick={toggleBlogSubmenu} // Toggle on click
            >
              <Link to='/blog' className="flex items-center space-x-2">
                <span>Blog</span>
          
              </Link>
            </li>
          </ul>

          {/* Center logo (clickable) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to='/'>
              <img
                className="h-10 w-auto"
                src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
                alt="Innobrains Official Logo"
              />
            </Link>
          </div>

          {/* Right navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to='/products' className="text-gray-800 font-semibold header_items">Products</Link>
            <Link to='/contact' className="bg-[#103153] text-white px-[20px] py-2 rounded-full text-sm font-medium">Contact us</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul>
              <li><Link to='/' className="block text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-base font-semibold">Home</Link></li>
              <li><Link to='/about' className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-semibold">About</Link></li>
              <li><Link to='/services' className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-semibold">Services</Link></li>
              <li><Link to='/products' className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-semibold">Products</Link></li>
              <li><Link to='/blog' className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-semibold">Blog</Link></li>
              <li>
                <Link to='/contact' className="block bg-[#103153] text-white px-3 py-2 rounded-full w-32 md:w-full mt-5 text-center text-base font-semibold">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
