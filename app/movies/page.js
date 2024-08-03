import Layout from "../components/layout";
import MovieGrid from "../components/movie-grid";
import { fetchMovies } from "../_utils/api";

const MoviesPage = async () => {
    const currentlyPlayingMovies = await fetchMovies("now_playing");
    const popularMovies = await fetchMovies("popular");
  
    return (
      <Layout>
      </Layout>
    );
  };
  
  
  export default MoviesPage;