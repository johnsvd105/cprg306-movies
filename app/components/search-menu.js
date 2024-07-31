"use client"
import { useState, useEffect } from "react";

const SearchMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Disable scrolling when the search menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 focus:outline-none">🔍Search</button>
      {isOpen && (
        <>
          <div className="fixed inset-0 top-[72px] bg-black opacity-50 z-40" onClick={closeMenu}></div>
          <div className="fixed right-0 top-16 w-1/3 mt-2 min-h-screen shadow-lg z-50 bg-gray-800">
            <div className="flex justify-between items-center p-2">
              <h2 className="ml-8 text-3xl font-bold mb-4">Search</h2>
              <button onClick={closeMenu} className="text-white text-4xl mt-4 mr-6">X</button>
            </div>
            <div className="flex justify-between items-center p-2 border-b ml-8 mr-6">
              <input
                type="text"
                className="border border-gray-300 p-2 w-full text-black"
                placeholder="Search movies..."
              />
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto px-8">
              {/* Dynamic movie results will go here */}
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center mb-4 bg-gray-700 p-4 rounded w-full">
                  <div className="w-16 h-24 bg-gray-400 mr-4"></div>
                  <div className="text-white flex-grow">Movie {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SearchMenu;