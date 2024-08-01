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
        console.log("fetched data: ", data);
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
        console.log("fetched data: ", data);
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
        console.log("fetched data: ", data);
        return data
    } 
    catch (error) {
        console.error(error);
        return [];
    }
}