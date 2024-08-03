"use client"
import Layout from "./components/layout";
import MovieGrid from "./components/movie-grid";
import { fetchMovies } from "./_utils/api";
import { useState,useEffect } from "react";

const HomePage = () => {
  const [currentlyPlayingMovies,setCurrentlyPlayingMovie] = useState([]);
  const [popularMovies, setPopularMovie] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const currentlyPlayingMovies = await fetchMovies("now_playing");
      const popularMovies = await fetchMovies("popular");

      setCurrentlyPlayingMovie(currentlyPlayingMovies);
      setPopularMovie(popularMovies);

      setLoading(false);
    };
    fetchData();
    }, []);

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
      <section className="mb-12 border border-gray-600 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Currently Airing</h2>
        <MovieGrid movies={currentlyPlayingMovies.results} limit={11} showMore="currently-airing"/>
      </section>

      <section className="mb-4 border border-gray-600 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <MovieGrid movies={popularMovies.results} limit={11} showMore="popular"/>
      </section>
    </Layout>
  );
};


export default HomePage;