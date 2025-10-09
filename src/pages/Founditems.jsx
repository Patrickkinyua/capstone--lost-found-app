import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Founditems() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const foundItems = [
    {
      id: 1,
      name: "Blue Notebook",
      date: "Oct 1, 2025",
      location: "Main Hall",
      description: "Spiral notebook with lecture notes, found on bench.",
      image:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      name: "Red Umbrella",
      date: "Oct 3, 2025",
      location: "Bus Stop",
      description: "Large red umbrella left at the campus bus stop.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Phone Charger",
      date: "Oct 5, 2025",
      location: "Study Room 3",
      description: "iPhone charger cable found under desk.",
      image:
        "https://images.unsplash.com/photo-1591290619762-c588f8e8e1f4?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Water Bottle",
      date: "Oct 7, 2025",
      location: "Gym",
      description: "Stainless steel water bottle with university logo.",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    },
  ];

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-purple-100 px-4 py-8 transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-5xl font-extrabold text-center md:text-left mb-6 md:mb-0">
            <span className="text-blue-700">Found</span>
            <span className="text-purple-700"> Items</span>
          </h1>
          <button
            onClick={() => navigate("/report-found-item")}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow transition mx-auto md:mx-0"
          >
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
          <div className="flex items-center bg-white border-2 border-blue-200 rounded-full px-4 py-2 w-full max-w-xl shadow focus-within:ring-2 focus-within:ring-blue-400 transition">
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
              placeholder="Search found item..."
              className="flex-1 outline-none bg-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {foundItems
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
                    <div className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">
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
                    className="w-full h-44 object-cover rounded-lg"
                  />
                </div>

                {/* Card Body */}
                <div className="px-4 pb-4 flex-1">
                  <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-full float-right transition transform hover:scale-105">
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

export default Founditems;
