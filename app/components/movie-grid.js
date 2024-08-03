import Link from "next/link";
import { formatUrlTitle,filteredMovieList } from "../_utils/utils";
const MovieGrid = ({movies,limit,showMore}) => {

    const displayedMovies = filteredMovieList(movies,limit)

    return (
      <div className="grid grid-cols-6 gap-6">
        {displayedMovies.map(movie => (
          <div key={movie.id} className=" p-4 flex items-center mb-2 flex-col">
            <Link href={`/movies/${movie.id}/${formatUrlTitle(movie.title)}`} passHref>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-max w-max object-cover rounded mb-2"/>
            <p className="text-center">{movie.title}</p>
            </Link>
          </div>
        ))}
        {showMore && (
            <div className="p-2 flex items-center mb-2 flex-col">
                <Link href={`/movies/${showMore}`} className="bg-gray-600 object-cover flex-1 w-full rounded mb-2 flex items-center justify-center">
                <p className="text-lg">Show more</p>
                </Link>
                <p className="text-center">{showMore}</p>
            </div>
        )}
    </div>
  );
};

export default MovieGrid