import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#D2E8FF] text-gray-700 py-10 px-6 sm:px-12 md:px-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative  flex flex-wrap md:flex-nowrap justify-between items-start">
        {/* Left section: Logo, Location, and Copyright */}
        <div className="mb-6 md:mb-0 w-full md:w-1/3">
          <div className="flex flex-col items-start">
          <Link to='/'> 
                      <img
                        className="h-10 w-auto"
                        src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
                        alt="Innobrains Official Logo"
                      />
                    </Link>
            {/* Location below the logo and copyright */}
            <div>
              <h3 className="text-lg font-semibold mb-1 roboto-thin">Address</h3>
              <p className="text-sm leading-relaxed roboto-thin">
                House number 211, Palm villas, phase 1 Jhang, 35200``
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold my-1 roboto-thin">Contact</h3>
              <p className="text-sm leading-relaxed roboto-thin">
                (047) 7502967
              </p>
              <p className="text-sm leading-relaxed roboto-thin">
                contact@innobrains.pk
              </p>
            </div>
          </div>
        </div>

        {/* Services section */}
        <div className="block md:flex  w-full md:w-1/3 justify-between mb-6 md:mb-0 ">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 roboto-thin">Our Services</h3>
          <ul className="space-y-1">
            <li><Link to="/services" className="roboto-thin">Web Development</Link></li>
            <li><Link to="/services" className="roboto-thin">Mobile App Development</Link></li>
            <li><Link to="/services" className="roboto-thin">UI/UX Design</Link></li>
            <li><Link to="/services" className="roboto-thin">Digital Marketing</Link></li>
          </ul>
        </div>

        {/* Company section */}
        <div className="">
          <h3 className="text-lg font-semibold mb-2 roboto-thin">Company</h3>
          <ul className="space-y-1">
            <li><Link to="/about" className="roboto-thin">About Us</Link></li>
            <li><Link to="/services" className="roboto-thin">Services</Link></li>
            <li><Link to="/blog" className="roboto-thin">Blog</Link></li>
            <li><Link to="/contact" className="roboto-thin">Contact Us</Link></li>
            
          </ul>
        </div>
        </div>
      </div>

      {/* Bottom section: Social Icons and Links */}
      <div className="text-center md:text-left mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
  <div className="flex justify-center md:justify-start mb-4 space-x-4 border-b-2 border-black border-solid pb-4">
    <Link to="https://wa.me/(047) 7502967" aria-label="WhatsApp">
      <FontAwesomeIcon icon={faWhatsapp} className="text-xl text-[#103153]" />
    </Link>
    <Link to="https://www.facebook.com/innobrains.pk" aria-label="Facebook">
      <FontAwesomeIcon icon={faFacebook} className="text-xl text-[#103153]" />
    </Link>
    <Link to="https://www.instagram.com/innobrains.pk/" aria-label="Instagram">
      <FontAwesomeIcon icon={faInstagram} className="text-xl text-[#103153]" />
    </Link>
    <Link to="https://www.linkedin.com/company/innobrainstech/posts/?feedView=all" aria-label="LinkedIn">
      {/* <FontAwesomeIcon icon={faLinkedin} className="text-xl text-[#103153]" /> */}
      <FaLinkedinIn className="text-xl text-[#103153]" />
    </Link>
  </div>

  <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
    <div className="mb-4 md:mb-0 roboto-thin">
      © 2025 Innobrains Technologies. All rights reserved.
    </div>
    <div className="space-x-3">
         
         <Link to="/privacy-policy" className="text-gray-800 hover:underline roboto-thin">Privacy Policy</Link>
         <Link to="/terms-of-service" className="text-gray-800 hover:underline roboto-thin">Terms of Service</Link>
         <Link to="/refund-policy" className="text-gray-800 hover:underline roboto-thin"> RefundPolicy</Link>

       </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;