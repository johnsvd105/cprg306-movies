"use client"
import { useState, useEffect } from "react";
import MovieGrid from "./movie-grid";
import { getUniqueMovies } from "@/app/_utils/utils";
import CriteriaBar from "./criteria-bar";
import { discoverMovies } from "../_utils/api";


const MovieCriteriaList = ({genres}) => {
    const [criteria, setCriteria] = useState({
        sortOption: "popularity.desc",
        searchAll: false,
        fromDate: "",
        toDate: "",
        selectedGenres: genres || []
    });

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setCriteria(prevCriteria => ({
            ...prevCriteria,
            selectedGenres: genres || []
        }));
    }, [genres]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { sortOption, searchAll, fromDate, toDate, selectedGenres } = criteria;
      const initialMovies = await discoverMovies({
        sortOption,
        searchAll,
        fromDate,
        toDate,
        selectedGenres,
      });
      setMovies(initialMovies.results);
      setTotalPages(initialMovies.total_pages);
      setLoading(false);
      setPage(1)
    };
    fetchData();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [criteria]);


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
    const { sortOption, searchAll, fromDate, toDate, selectedGenres } = criteria;
    const newMovies = await discoverMovies({
      sortOption,
      searchAll,
      fromDate,
      toDate,
      selectedGenres,
    },newPage);
    const updatedMovies = getUniqueMovies([...movies, ...newMovies.results]);

    setMovies(updatedMovies);
    setPage(newPage);
    setLoading(false);
  };

  return (
    <div className="flex">
      <div className="w-1/5 sticky top-20 h-screen overflow-y-auto bg-gray-100 border-r border-gray-300 rounded-lg">
        <CriteriaBar setCriteria={setCriteria} initialGenres={criteria.selectedGenres}/>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Movies</h1>
        <MovieGrid movies={movies} />
        {loading && (
          <div className="p-4 flex items-center mb-4 flex-col">
            <div className="bg-blue-600 object-cover flex-1 w-full rounded mb-2 flex items-center justify-center">
              <p className="text-lg text-white">Loading more...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCriteriaList;