import Layout from "@/app/components/layout";
import MovieList from "@/app/components/movie-list";

const CurrentlyAiringMovies = () => {
  return (
    <Layout>
        <h1 className="text-2xl font-bold mb-4">Currently Airing</h1>
        <MovieList type="now_playing"/>
    </Layout>
    )
};

export default CurrentlyAiringMovies;
