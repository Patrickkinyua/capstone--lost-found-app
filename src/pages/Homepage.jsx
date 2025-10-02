import React from 'react'
import Navbar from '../components/Navbar'

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-green-50 to-green-100">
        <div className="flex flex-col md:flex-row items-center w-full max-w-5xl px-4 py-12">
          {/* Left: Text */}
          <div className="flex-1 mb-10 md:mb-0 md:mr-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Find &<br />
              <span className="text-green-700">Recover</span>{' '}
              <span className="text-green-500">With <span className="text-red-700">Ease</span></span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Experience effortless recovery with our dedicated lost and found service.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-lg shadow transition w-48">
                <span className="mr-2">Lost</span>
                <span role="img" aria-label="lost">🧰</span>
              </button>
              <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 rounded-lg shadow transition w-48">
                <span className="mr-2">Found</span>
                <span role="img" aria-label="found">✅</span>
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-2">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Easy to use platform</li>
              <li>Fast recovery process</li>
              <li>Community-driven</li>
            </ul>
          </div>
          {/* Right: Images */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex space-x-4">
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
                alt="Lost item"
                className="rounded-lg shadow-lg w-40 h-28 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
                alt="Found poster"
                className="rounded-lg shadow-lg w-28 h-28 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80"
                alt="Compass"
                className="rounded-lg shadow-lg w-28 h-28 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage