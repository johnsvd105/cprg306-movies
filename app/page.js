import Layout from "./components/layout";
import MovieGrid from "./components/movie-grid";
import { fetchMovies } from "./_utils/api";



const Page = async () => {
  const currentlyPlayingMovies = await fetchMovies("now_playing");
  const popularMovies = await fetchMovies("popular");

  return (
    <Layout>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Currently Airing</h2>
        <MovieGrid movies={currentlyPlayingMovies.results} limit={11} showMore="/movies/currently-airing"/>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <MovieGrid movies={popularMovies.results} limit={11} showMore="/movies/popular"/>
      </section>
    </Layout>
  );
};


export default Page;