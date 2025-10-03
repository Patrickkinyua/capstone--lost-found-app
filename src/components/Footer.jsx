import React from 'react'

function Footer() {
  return (
    <footer className="bg-white shadow-md mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
        <div className="mb-4 md:mb-0">
          <img src="src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>
        <ul className="flex flex-col md:flex-row md:space-x-8 text-gray-700 font-semibold mb-4 md:mb-0">
          <li className="hover:text-blue-600 cursor-pointer">Lost</li>
          <li className="hover:text-blue-600 cursor-pointer">Found</li>
          <li className="hover:text-blue-600 cursor-pointer">Report Lost Item</li>
          <li className="hover:text-blue-600 cursor-pointer">Report Found Item</li>
        </ul>
        <ul className="flex flex-col md:flex-row md:space-x-8 text-gray-700 font-semibold mb-4 md:mb-0">
          <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
        </ul>
        <div className="text-gray-500 text-sm text-center md:text-right">
          © 2025 All rights reserved. patrickkinyua
        </div>
      </div>
    </footer>
  )
}

export default Footer