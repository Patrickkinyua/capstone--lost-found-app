import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white shadow-md mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
        <div className="mb-4 md:mb-0">
          <Link to="/">
            <img src="src/assets/logo.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row md:space-x-8 text-gray-700 font-semibold mb-4 md:mb-0">
          <li>
            <Link to="/lost-items" className="hover:text-blue-600 cursor-pointer">Lost</Link>
          </li>
          <li>
            <Link to="/found-items" className="hover:text-blue-600 cursor-pointer">Found</Link>
          </li>
          <li>
            <Link to="/report-lost-item" className="hover:text-blue-600 cursor-pointer">Report Lost Item</Link>
          </li>
          <li>
            <Link to="/report-found-item" className="hover:text-blue-600 cursor-pointer">Report Found Item</Link>
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row md:space-x-8 text-gray-700 font-semibold mb-4 md:mb-0">
          <li>
            <Link to="/contact-us" className="hover:text-blue-600 cursor-pointer">Contact Us</Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:text-blue-600 cursor-pointer">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-of-service" className="hover:text-blue-600 cursor-pointer">Terms of Service</Link>
          </li>
        </ul>
        <div className="text-gray-500 text-sm text-center md:text-right">
          © 2025 All rights reserved. patrickkinyua
        </div>
      </div>
    </footer>
  )
}

export default Footer