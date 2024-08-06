import { useState, useEffect } from "react";
import { fetchGenres } from "../_utils/api";

const CriteriaBar = ({setCriteria, initialGenres = []}) => {
    const [sortOption, setSortOption] = useState("popularity.desc");
    const [searchAll, setSearchAll] = useState(true);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
        const genresData = await fetchGenres();
        setGenres(genresData);
        };
        fetchData();
    }, []);


    useEffect(() => {
            setSelectedGenres(initialGenres);
    }, [initialGenres]);

  useEffect(() => {
    setCriteria({
      sortOption,
      fromDate: searchAll ? "" : fromDate,
      toDate: searchAll ? "" : toDate,
      selectedGenres,
    });
  }, [sortOption, searchAll, fromDate, toDate, selectedGenres,setCriteria]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const updateURL = (newSelectedGenres) => {
        const queryParams = new URLSearchParams(window.location.search);
        if (newSelectedGenres.length > 0) {
          queryParams.set('genre', newSelectedGenres.join(','));
        } else {
          queryParams.delete('genre');
        }
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      };

    const handleGenreClick = (genreId) => {
        const newSelectedGenres = selectedGenres.includes(genreId)
        ? selectedGenres.filter(id => id !== genreId)
        : [...selectedGenres, genreId];

        setSelectedGenres(newSelectedGenres);
        updateURL(newSelectedGenres);
    };

  return (
    <div className="p-4 bg-gray-100 border-r border-gray-300 rounded-lg h-full">
    <div className="mb-4">
      <label className="block font-bold mb-2">Sort results by:</label>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
        <option value="primary_release_date.asc">Release Date Ascending</option>
        <option value="primary_release_date.desc">Release Date Descending</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block font-bold mb-2">Release Date:</label>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={searchAll}
          onChange={() => setSearchAll(!searchAll)}
          className="mr-2"
        />
        <span>Search all?</span>
      </div>
      {!searchAll && (
        <>
          <label className="block mb-1">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          />
          <label className="block mb-1">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </>
      )}
    </div>

    <div>
      <label className="block font-bold mb-2">Genres:</label>
      <div className="flex flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`p-2 m-1 border rounded-lg ${
              selectedGenres.includes(genre.id) ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);
};

export default CriteriaBar;