import React from 'react'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <div>
          <img src="src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>
        <ul className="flex space-x-8 text-gray-700 font-semibold">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Lost Items</li>
          <li className="hover:text-blue-600 cursor-pointer">Found Items</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar