import Layout from "@/app/components/layout";
import MovieList from "@/app/components/movie-list";

const PopularMoviesPage = () => {
  return (
    <Layout>
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
        <MovieList type="popular"/>
    </Layout>
    )
};

export default PopularMoviesPage;
