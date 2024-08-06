const apiKey = process.env.NEXT_PUBLIC_TMDB_API_ACCESS_KEY;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`
    }
};


export const fetchMovies = async (type, page = 1, region ="CA" ) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}&region=${region}`,options);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error(error);
        return [];
    }
}


export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        return data
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}

export const searchMovies = async(query, page = 1, region="CA") => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&region=${region}`,options);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        return data
    } 
    catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchGenres = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };


export const discoverMovies = async(criteria, page = 1) => {
    const { sortOption, fromDate, toDate, selectedGenres } = criteria;
    const genreString = selectedGenres.join(",");

    const url = new URL(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`);
    url.searchParams.append("sort_by", sortOption);
    if (fromDate) url.searchParams.append("primary_release_date.gte", fromDate);
    if (toDate) url.searchParams.append("primary_release_date.lte", toDate);
    if (genreString) url.searchParams.append("with_genres", genreString);

    try {
        const response = await fetch(url,options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
  }