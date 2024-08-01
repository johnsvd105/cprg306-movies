"use client"
import { useState, useEffect } from "react";
import { searchMovies } from "../_utils/api";
import { filteredMovieList,formatUrlTitle } from "../_utils/utils";
import Link from "next/link";


const SearchMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setQuery("");
    setSearchResults([]);
  };


  useEffect(() => {
    if (query.length >= 3) {
      const fetchData = async () => {
          setLoading(true);
          const movies = await searchMovies(query);

          setSearchResults(filteredMovieList(movies.results));
          setLoading(false);
        };
        fetchData();
    } else {
        setSearchResults([]);
    }
  }, [query]);

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
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto px-8">
            {loading && <p className="text-white">Loading...</p>}
              {!loading && searchResults.length === 0 && query.length >= 3 && <p className="text-white">No results found.</p>}
              {!loading && searchResults.map((movie) => (
                <Link href={`/movies/${movie.id}/${formatUrlTitle(movie.title)}`} passHref key={movie.id}>
                  <div className="flex items-center mb-4 bg-gray-700 p-4 rounded w-full cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-auto h-40 bg-gray-400 mr-4 object-cover" 
                    />
                    <div className="text-white flex-grow">{movie.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SearchMenu;