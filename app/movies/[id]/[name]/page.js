"use client"
import { fetchMovieDetails } from "@/app/_utils/api";
import Layout from "@/app/components/layout";
import { formatRuntime } from "@/app/_utils/utils";
import { useEffect,useState } from "react";
import { formatUrlTitle } from "@/app/_utils/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const IndividualMoviePage = ({params }) => {
    const {id} = params;
    const [currentMovie,setCurrentMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                const movie = await fetchMovieDetails(id);
                setCurrentMovie(movie);
                setLoading(false);

                console.log(id)
                console.log(movie);

                if (movie != null) {
                    const newMovieURL = formatUrlTitle(movie.title);
                    const newPath = `/movies/${id}/${newMovieURL}`;
                    if (newPath != pathname) {
                        window.history.replaceState({}, "",newPath);
                    }
                }
            };
        fetchData();
        }
        else
        {
            setCurrentMovie(null);
        }
      }, [id,pathname]);


      if (loading) {
        return (
            <Layout>
                 <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-3xl font-bold">Loading...</h1>
                </div>
            </Layout>
        )
      }

    return (
    <Layout>
        <div className="p-4">
            {!currentMovie ? (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold">Movie not found</h1>
            </div>
            ) : (
            <div className="flex flex-row items-start">
                {/* Movie Image */}
                <div className="flex-shrink-0">
                    <img
                    src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                    alt={currentMovie.title}
                    className="rounded-lg shadow-lg w-96 h-auto"
                    />
                </div>

                {/* Movie Details */}
                <div className="ml-8">
                    <h1 className="text-2xl font-bold mb-2">
                    {currentMovie.title} ({new Date(currentMovie.release_date).getFullYear()})
                    </h1>
                    <p className="text-lg mb-2">
                    Release Date: {currentMovie.release_date} ({new Date(currentMovie.release_date).toDateString()})
                    </p>
                    <p className="text-lg mb-2">
                    Genres: {currentMovie.genres.map(genre => (
                        <Link
                        key={genre.id}
                        href={{
                            pathname: '/movies',
                            query: {genre: genre.id},
                        }}
                        >
                        <span className="text-blue-500 cursor-pointer">{genre.name}</span>
                        </Link>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                    {/* Genres: {currentMovie.genres.map(genre => genre.name).join(", ")} */}
                    </p>
                    <p className="text-lg mb-8">
                    Runtime: {formatRuntime(currentMovie.runtime)}
                    </p>
                    <p className="italic text-lg mb-2">
                        {currentMovie.tagline}
                    </p>
                    <p className="text-lg mb-2">
                        Description:
                    </p>
                    <p className="text-lg pl-6">
                    {currentMovie.overview}  
                    </p>
                </div>
            </div>
            )}
        </div>
    </Layout>
    );
};

export default IndividualMoviePage;
