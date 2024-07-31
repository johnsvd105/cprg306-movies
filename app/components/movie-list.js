"use client"
import { fetchMovies } from "@/app/_utils/api";
import { useState,useEffect } from "react";
import MovieGrid from "@/app/components/movie-grid";
import { getUniqueMovies } from "@/app/_utils/utils";


const MovieList = ({type }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const initialMovies = await fetchMovies(type); 
      setMovies(initialMovies.results);

      setTotalPages(initialMovies.total_pages)
      setLoading(false);
    };
    fetchData();
  }, []); 


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, page]);


  const loadMore = async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);
    const newPage = page + 1;
    const newMovies = await fetchMovies("popular", "CA", newPage);
    const updatedMovies = getUniqueMovies([...movies, ...newMovies.results]);

    setMovies(updatedMovies);
    setPage(newPage);
    setTimeout(() => setLoading(false),1000);
  };



  return (
    <div>
      <MovieGrid movies={movies} onLoadMore={loadMore} loading={loading}
      showLoadMoreButton={false}
      />
       {loading && (
        <div className="p-4 flex items-center mb-4 flex-col">
          <div className="bg-gray-600 object-cover flex-1 w-full rounded mb-2 flex items-center justify-center">
            <p className="text-lg">Loading more...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;