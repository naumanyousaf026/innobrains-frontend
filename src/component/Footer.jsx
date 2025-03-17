import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] text-gray-700 py-10 px-6 sm:px-12 md:px-24">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-start">
        {/* Left section: Logo, Location, and Copyright */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="flex flex-col items-start">
            <img
              src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
              alt="Innobrains Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm leading-none mb-4 roboto-thin ">
              Copyright © 2023. Startup Agency
            </p>
            {/* Location below the logo and copyright */}
            <div>
              <h3 className="text-lg font-semibold mb-2 roboto-thin">
                Location
              </h3>
              <p className="text-sm leading-relaxed roboto-thin">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit.
                <br />
                Pellentesque fermentum consectetur leo.
              </p>
            </div>
          </div>
        </div>

        {/* Services section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2 roboto-thin">
            Our Services
          </h3>
          <ul className="space-y-1">
            <li>
              <Link to="/services">Web Development</Link>
            </li>
            <li>
              <Link to="/services">Mobile App Development</Link>
            </li>
            <li>
              <Link to="/services">UI/UX Design</Link>
            </li>
            <li>
              <Link to="/services">Digital Marketing</Link>
            </li>
          </ul>
        </div>

        {/* Company section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2 roboto-thin">Company</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/">Pages</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section: Social Icons and Links */}
      <div className="text-center md:text-left mt-6">
        <div className="flex justify-center md:justify-start mb-4 space-x-4">
          <a href="https://wa.me/your-number" aria-label="WhatsApp">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-xl text-[#103153]"
            />
          </a>
          <a href="https://facebook.com/your-page" aria-label="Facebook">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-xl text-[#103153]"
            />
          </a>
          <a href="https://instagram.com/your-profile" aria-label="Instagram">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl text-[#103153]"
            />
          </a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="mb-4 md:mb-0 roboto-thin">
            © 2024 Innobrains Technologies. All rights reserved.
          </div>
          <div className="space-x-3">
            <Link
              to="/privacy-policy"
              className="text-gray-800 hover:underline roboto-thin"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-800 hover:underline roboto-thin"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
