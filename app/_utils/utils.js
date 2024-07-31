export const formatUrlTitle = (title) => {
    return title
        .toLowerCase()
        .replace(/[:\s]/g, '-')
        .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};


export const formatRuntime = (runtime) => {
    if (runtime ==0 | null) {
      return `Runtime not yet available`
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
}



export const getUniqueMovies = (allMovies) => {
    const seen = new Set();
    return allMovies.filter(movie => {
      const isDuplicate = seen.has(movie.id);
      seen.add(movie.id);
      return !isDuplicate;
    });
  };


  export const filteredMovieList = (movies,limit) => {
    //if a movie doesn't have a poster_path I just remove it, since movies without a poster_path on TMDB are almost always fully empty 
    const filteredMovies = (limit ? movies.slice(0, limit) : movies).filter(movie => movie.poster_path);
    return filteredMovies;
  }