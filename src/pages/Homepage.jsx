import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-green-50 to-green-100">
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-4 py-12">
          {/* Left: Text & Buttons */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight">
              Find &<br />
              <span className="text-green-700">Recover</span>
              <br />
              <span className="text-green-600">
                With <span className="text-red-700">Ease</span>
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-6 mt-2">
              Experience effortless recovery with our dedicated lost and found service.
            </p>
            <div className="flex flex-col gap-4 mb-8 w-56">
              <button className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow transition w-full">
                <span>Lost</span>
                <img
                  src="https://img.icons8.com/fluency/32/box-important.png"
                  alt="Lost"
                  className="ml-2"
                />
              </button>
              <button className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow transition w-full">
                <span>Found</span>
                <img
                  src="https://img.icons8.com/fluency/32/checked-checkbox.png"
                  alt="Found"
                  className="ml-2"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Homepage