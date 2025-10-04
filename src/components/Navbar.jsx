import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <Link to="/">
          <img src="src/assets/logo.png" alt="Logo" className="h-15 w-auto cursor-pointer" />
        </Link>
        <ul className="flex space-x-8 text-gray-700 font-semibold">
          <li>
            <Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link>
          </li>
          <li>
            <Link to="/lost-items" className="hover:text-blue-600 cursor-pointer">Lost Items</Link>
          </li>
          <li>
            <Link to="/found-items" className="hover:text-blue-600 cursor-pointer">Found Items</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar