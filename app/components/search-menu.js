import { useState } from 'react';

const SearchMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 focus:outline-none">🔍Search</button>
      {isOpen && (
        <div className="absolute right-0 top-0 w-64 bg-white shadow-lg rounded mt-2">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full"
            placeholder="Search movies..."
          />
          <div className="mt-2 max-h-60 overflow-y-auto">
            {/* Dynamic movie results will go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMenu;