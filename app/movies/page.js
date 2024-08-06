"use client"
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MovieCriteriaList from "../components/movies-criteria-list";

const MoviesPage = () => {

  const [initialGenres, setInitialGenres] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const genresFromQuery = params.get('genre')
        ? params.get('genre').split(',').map(id => parseInt(id))
        : [];
      setInitialGenres(genresFromQuery);
    }
  }, []);

    return (
      <Layout>
        <MovieCriteriaList genres={initialGenres}/>
      </Layout>
    );
  };
  
  
  export default MoviesPage;