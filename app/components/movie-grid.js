import Link from "next/link";
import { formatUrlTitle } from "../_utils/utils";
const MovieGrid = ({movies,limit,showMore}) => {
    const displayedMovies = limit ? movies.slice(0, limit) : movies;

    return (
          <div className="grid grid-cols-6 gap-8">
            {displayedMovies.map(movie => (
              <div key={movie.id} className=" p-4 flex items-center mb-4 flex-col">
                <Link href={`/movies/${movie.id}/${formatUrlTitle(movie.title)}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto w-auto object-cover rounded mb-2" />
                <p className="text-center">{movie.title}</p>
                </Link>
              </div>
            ))}
            {showMore && (
                <div className="p-4 flex items-center mb-4 flex-col">
                    <Link href={showMore} className="bg-gray-600 object-cover flex-1 w-full rounded mb-2 flex items-center justify-center">
                        <p className="text-lg">Show more</p>
                    </Link>
                    <p className="text-center">Show more</p>
                </div>
            )}
          </div>
      );
};

export default MovieGrid