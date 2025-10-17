import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getPlaceholderImage, getLocalFoundItems, deleteFoundItem } from "../api-work/fetchinng";

function Founditems() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    
    // Load found items from localStorage
    const loadFoundItems = () => {
      try {
        setLoading(true);
        
        // Get items marked as found from localStorage
        const items = getLocalFoundItems();
        console.log("Found items from localStorage:", items);
        console.log("Number of found items:", items.length);
        
        // Transform and add placeholder images
        const itemsWithImages = items.map((item) => ({
          ...item,
          image: getPlaceholderImage(item.item || item.name),
        }));
        
        setFoundItems(itemsWithImages);
        setError(null);
      } catch (err) {
        console.error("Failed to load found items:", err);
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadFoundItems();
  }, []);

  // Handle deleting a found item
  const handleDeleteItem = async (item) => {
    setDeleting(true);
    try {
      console.log("Starting delete for item:", item);
      
      // Delete from localStorage
      deleteFoundItem(item.id);
      
      // Remove from UI
      setFoundItems(prev => prev.filter(i => i.id !== item.id));
      setItemToDelete(null);
      
      // Show success message
      alert('✓ Item deleted successfully!');
    } catch (err) {
      console.error('❌ Failed to delete item:', err);
      alert('Failed to delete item. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading found items...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
        <div className="flex flex-wrap justify-center gap-8">
          {foundItems
            .filter((item) => {
              const query = searchQuery.toLowerCase();
              return (
                (item.item || item.name || "").toLowerCase().includes(query) ||
                (item.location || "").toLowerCase().includes(query) ||
                (item.description || "").toLowerCase().includes(query)
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
                      {(item.item || item.name).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 text-sm">
                        {item.item || item.name}
                      </div>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                  </div>
                </div>

                {/* Card Image */}
                <div className="flex items-center justify-center px-4 py-6">
                  <img
                    src={item.image}
                    alt={item.item || item.name}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                </div>

                {/* Card Body */}
                <div className="px-4 pb-4 flex-1">
                  <div className="text-sm text-gray-400 mb-2">{item.location}</div>
                  <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setItemToDelete(item)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-full transition transform hover:scale-105"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}

        {/* No Results */}
        {!loading && !error && foundItems.length === 0 && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center text-gray-500">
              <p className="text-xl font-semibold mb-2">No found items yet</p>
              <p>Be the first to report a found item!</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => !deleting && setItemToDelete(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Delete Item?</h3>
              <button 
                onClick={() => setItemToDelete(null)}
                disabled={deleting}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete <span className="font-semibold">{itemToDelete.item || itemToDelete.name}</span>?
              </p>
              <p className="text-sm text-gray-500">
                This action cannot be undone. The item will be permanently removed from the found items list.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToDelete(null)}
                disabled={deleting}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteItem(itemToDelete)}
                disabled={deleting}
                className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition ${
                  deleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Contact Details</h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Item Details</h4>
                <p className="text-gray-600"><span className="font-medium">Item:</span> {selectedItem.item || selectedItem.name}</p>
                <p className="text-gray-600"><span className="font-medium">Location:</span> {selectedItem.location}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Contact Information</h4>
                
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">{selectedItem.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href={`tel:${selectedItem.phone}`} className="font-medium text-blue-600 hover:underline">
                      {selectedItem.phone || 'Not provided'}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a href={`mailto:${selectedItem.email}`} className="font-medium text-blue-600 hover:underline break-all">
                      {selectedItem.email || 'Not provided'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedItem(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Founditems;
