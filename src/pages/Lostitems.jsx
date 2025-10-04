import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Lostitems() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShow(true), 100);
  }, []);

  // Example lost items data
  const lostItems = [
    {
      id: 1,
      name: "Black Wallet",
      date: "Sept 25, 2025",
      location: "University Library",
      description: "Leather wallet with ID cards and student pass.",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      name: "Silver Laptop",
      date: "Sept 28, 2025",
      location: "Computer Lab",
      description: "MacBook Pro with stickers on the cover.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Wrist Watch",
      date: "Sept 29, 2025",
      location: "Sports Field",
      description: "Black strap analog wristwatch found near benches.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Backpack",
      date: "Sept 30, 2025",
      location: "Cafeteria",
      description: "Blue backpack with textbooks inside.",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    },
  ];

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-green-100 px-4 py-8 transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-5xl font-extrabold text-center md:text-left mb-6 md:mb-0">
            <span className="text-red-700">Lost</span>
            <span className="text-green-700"> Items</span>
          </h1>
          <button onClick={() => navigate("/report-lost-item")} className="flex items-center bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow transition mx-auto md:mx-0">
            Report
            <img
              src="https://img.icons8.com/fluency/32/box-important.png"
              alt="Report"
              className="ml-2"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-white border-2 border-red-200 rounded-full px-4 py-2 w-full max-w-xl shadow focus-within:ring-2 focus-within:ring-red-400 transition">
            <span className="text-gray-400 mr-2">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search lost item..."
              className="flex-1 outline-none bg-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {lostItems
            .filter((item) => {
              const query = searchQuery.toLowerCase();
              return (
                item.name.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
              );
            })
            .map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md w-72 mb-6 flex flex-col transform hover:scale-105 hover:shadow-lg transition"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-t-xl">
                <div className="flex items-center">
                  <div className="bg-purple-300 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700 text-sm">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">{item.date}</div>
                  </div>
                </div>
              </div>

              {/* Card Image */}
              <div className="flex items-center justify-center px-4 py-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-full border"
                />
              </div>

              {/* Card Body */}
              <div className="px-4 pb-4 flex-1">
                <div className="text-sm text-gray-400 mb-2">{item.location}</div>
                <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-full float-right transition transform hover:scale-105">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Lostitems;
